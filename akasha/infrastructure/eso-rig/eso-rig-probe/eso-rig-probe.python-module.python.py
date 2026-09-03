#!/usr/bin/env python3
"""Measurement instruments for the ESO rig substrate acceptance.

Three subcommands, each one measurement `entrypoint.sh --self-test` cannot make
in shell:

  uinput      Create a virtual keyboard, hold it open, and inject on demand.
              The device exists only while this process lives, and Xorg must be
              started AFTER the node appears (the rig's X config names the event
              node explicitly and has hotplug off), so create-and-inject cannot
              be one shot — hence the stdin command loop.

  xwd-stats   Distinct-color count of an xwd capture. A capture that is
              uniformly one color is a blank frame reporting success — the
              failure mode the Wine claim exists to catch.

  xwd-diff    Per-pixel difference COUNT between two captures, not a boolean:
              a text caret blinking by itself changes a few dozen pixels, so
              "the frames differ" is also true of a window that received
              nothing. The caller compares the count against a floor.

Each subcommand prints a single line of `key=value` pairs on stdout.
"""

import argparse
import glob
import os
import struct
import sys
import time

KEY_NAME = "KEY_A"

DEFAULT_DEVICE_NAME = "eso-rig-virtual-keyboard-%d" % os.getpid()

XWD_HEADER_FIELDS = 25
XWD_FILE_VERSION = 7
XWD_COLOR_SIZE = 12


def find_event_node(name, timeout=10.0):
    """Return the /dev/input/event* path of the device called `name`.

    Scans devtmpfs rather than asking python-evdev for the node it just made:
    devtmpfs creates the node itself, so this works in a container with no udev,
    and it does not depend on a private helper of the evdev package.
    """
    import evdev

    deadline = time.time() + timeout
    while time.time() < deadline:
        for path in sorted(glob.glob("/dev/input/event*")):
            try:
                dev = evdev.InputDevice(path)
            except OSError:
                continue
            try:
                if dev.name == name:
                    return path
            finally:
                dev.close()
        time.sleep(0.1)
    return None


def cmd_uinput(args):
    from evdev import UInput, ecodes

    keycode = ecodes.ecodes[KEY_NAME]
    with UInput({ecodes.EV_KEY: [keycode]}, name=args.name) as device:
        path = find_event_node(args.name)
        if path is None:
            print("ERROR no /dev/input node appeared for %s" % args.name, flush=True)
            return 1
        print("EVENT %s" % path, flush=True)
        return _inject_loop(device, ecodes, keycode)


def _inject_loop(device, ecodes, keycode):
    """Serve `inject <n>` / `quit` from stdin until the writer closes it."""
    while True:
        line = sys.stdin.readline()
        if line == "":
            return 0
        parts = line.split()
        if not parts:
            continue
        if parts[0] == "quit":
            return 0
        if parts[0] == "inject" and len(parts) == 2:
            for _ in range(int(parts[1])):
                device.write(ecodes.EV_KEY, keycode, 1)
                device.syn()
                time.sleep(0.02)
                device.write(ecodes.EV_KEY, keycode, 0)
                device.syn()
                time.sleep(0.02)
            print("INJECTED %s" % parts[1], flush=True)
            continue
        print("ERROR unknown command %s" % parts[0], flush=True)


def read_xwd(path):
    """Parse an xwd v7 capture into row byte-slices."""
    with open(path, "rb") as handle:
        raw = handle.read()
    if len(raw) < 4 * XWD_HEADER_FIELDS:
        raise SystemExit("truncated xwd capture: %s" % path)
    for endian in (">", "<"):
        fields = struct.unpack_from("%s%dI" % (endian, XWD_HEADER_FIELDS), raw, 0)
        if fields[1] == XWD_FILE_VERSION and fields[0] >= 4 * XWD_HEADER_FIELDS:
            break
    else:
        raise SystemExit("not an xwd v%d capture: %s" % (XWD_FILE_VERSION, path))
    header_size, width, height = fields[0], fields[4], fields[5]
    bits_per_pixel, bytes_per_line, ncolors = fields[11], fields[12], fields[19]
    bpp = bits_per_pixel // 8
    offset = header_size + ncolors * XWD_COLOR_SIZE
    rows = [
        raw[offset + y * bytes_per_line : offset + y * bytes_per_line + width * bpp]
        for y in range(height)
    ]
    return {"width": width, "height": height, "bpp": bpp, "rows": rows}


def cmd_xwd_stats(args):
    image = read_xwd(args.file)
    bpp = image["bpp"]
    seen = set()
    for row in set(image["rows"]):
        for index in range(0, len(row), bpp):
            seen.add(row[index : index + bpp])
        if len(seen) >= args.cap:
            break
    capped = len(seen) >= args.cap
    print(
        "colors=%d capped=%s width=%d height=%d bpp=%d"
        % (len(seen), "true" if capped else "false", image["width"], image["height"], bpp)
    )
    return 0


def cmd_xwd_diff(args):
    before, after = read_xwd(args.before), read_xwd(args.after)
    shape = ("width", "height", "bpp")
    if [before[k] for k in shape] != [after[k] for k in shape]:
        print("differing=-1 total=0 note=geometry-mismatch")
        return 1
    bpp = before["bpp"]
    differing = 0
    for row_before, row_after in zip(before["rows"], after["rows"]):
        if row_before == row_after:
            continue
        for index in range(0, len(row_before), bpp):
            if row_before[index : index + bpp] != row_after[index : index + bpp]:
                differing += 1
    print("differing=%d total=%d" % (differing, before["width"] * before["height"]))
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)

    uinput = sub.add_parser("uinput", help="create a virtual keyboard and inject on demand")
    uinput.add_argument("--name", default=DEFAULT_DEVICE_NAME)
    uinput.set_defaults(func=cmd_uinput)

    stats = sub.add_parser("xwd-stats", help="distinct-color count of an xwd capture")
    stats.add_argument("file")
    stats.add_argument("--cap", type=int, default=8, help="stop counting at this many colors")
    stats.set_defaults(func=cmd_xwd_stats)

    diff = sub.add_parser("xwd-diff", help="per-pixel difference count between two captures")
    diff.add_argument("before")
    diff.add_argument("after")
    diff.set_defaults(func=cmd_xwd_diff)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())

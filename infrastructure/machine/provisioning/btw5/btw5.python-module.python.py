#!/usr/bin/env python3
"""Configure the Creative BT-W5 Bluetooth transmitter over its hidraw interface.

Usage: btw5 <hfp|auto-hfp> <on|off>
       btw5 codec <ll|hq>
"""
import fcntl
import glob
import sys

BT_W5_HID_ID = "0000041E:00003130"

# Payloads reverse-engineered from Creative's Windows app USB traffic
# (https://github.com/RaphaelWimmer/btw5-switch, bt-w5.pcapng annotations).
# Feature report 3: 03 5a 6b 03 0a <group> <value>, zero-padded to 65 bytes.
COMMANDS = {
    ("hfp", "on"): (0x01, 0x01),
    ("hfp", "off"): (0x01, 0x02),
    ("auto-hfp", "on"): (0x02, 0x01),
    ("auto-hfp", "off"): (0x02, 0x00),
    ("codec", "ll"): (0x03, 0x20),
    ("codec", "hq"): (0x03, 0x40),
}

REPORT_LENGTH = 65


def hidiocsfeature(length: int) -> int:
    return (3 << 30) | (length << 16) | (ord("H") << 8) | 0x06


def find_hidraw_nodes() -> list:
    nodes = []
    for uevent in sorted(glob.glob("/sys/class/hidraw/hidraw*/device/uevent")):
        if BT_W5_HID_ID in open(uevent).read():
            nodes.append("/dev/" + uevent.split("/")[4])
    return nodes


def main() -> int:
    command = COMMANDS.get(tuple(sys.argv[1:3]))
    if command is None:
        print(__doc__.strip(), file=sys.stderr)
        return 2

    nodes = find_hidraw_nodes()
    if not nodes:
        print("error: no Creative BT-W5 hidraw device found", file=sys.stderr)
        return 1

    group, value = command
    payload = bytearray(REPORT_LENGTH)
    payload[0:7] = bytes([0x03, 0x5A, 0x6B, 0x03, 0x0A, group, value])

    errors = []
    for node in nodes:
        try:
            with open(node, "wb") as fd:
                fcntl.ioctl(fd, hidiocsfeature(REPORT_LENGTH), bytes(payload))
            print(f"sent {sys.argv[1]} {sys.argv[2]} via {node}")
            return 0
        except OSError as err:
            errors.append(f"{node}: {err}")

    print("error: all BT-W5 hidraw nodes rejected the report", file=sys.stderr)
    for line in errors:
        print(f"  {line}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())

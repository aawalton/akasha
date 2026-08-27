---
description: "The headless GPU ESO rig SUBSTRATE image — ubuntu:24.04 carrying Xorg (dummy framebuffer + evdev input), a uinput virtual keyboard, and Wine, so a real Windows GUI client runs and is DRIVEN on a cluster GPU node with no display, no keyboard, and no human. Covers why Xorg and not Xvfb, why the image ships no NVIDIA userspace, why the pod must be privileged, the build/publish path, and the control structure of the `--self-test` substrate acceptance. Origin: #15808."
---

# @infra/eso-rig — headless GPU rig substrate

The container substrate for running a Windows GUI game client on a cluster GPU
node, unattended. It is deliberately *only* the substrate: an X server with a
framebuffer, a virtual keyboard the X server consumes as a real input device,
Wine, and one acceptance that proves all three actually work on the node it
lands on. No game, no controller, no policy.

Three things it must be able to prove, because each has a silent-failure mode
that looks exactly like success:

- **The GPU renders.** A frame from a software rasterizer is pixel-identical to
  one from the card.
- **Injected input lands.** An injector that writes to a device nobody reads
  exits 0.
- **A Windows GUI app receives that input.** A blank screen capture is still a
  capture.

## Why Xorg, not Xvfb

This is the finding that reshaped the design. **Xvfb has no evdev/libinput input
backend.** It accepts XTEST and nothing else; it can neither open nor consume a
`/dev/input/event*` node. A uinput device — the only way to feed a Windows
client synthetic input that is indistinguishable from hardware — can therefore
never reach an Xvfb server.

`Xorg` + `xserver-xorg-video-dummy` (framebuffer with no hardware behind it) +
`xserver-xorg-input-evdev` (an input driver that opens an event node) is the
only combination in this family that consumes a uinput device. Do not
"simplify" this to Xvfb.

## Why the image ships no NVIDIA userspace

The Talos nvidia-container-toolkit extension injects the **entire NVIDIA driver
userspace** into the container at runtime, under `/usr/local/glibc/usr/lib/`.
Driver userspace must match the running kernel driver exactly, so an image that
also shipped NVIDIA libraries would put a second, mismatched copy on the loader
path — and the failure mode of that mismatch is a silent fall back to software
rendering, which no screenshot can detect. The base is therefore plain
`ubuntu:24.04`, never an `nvidia/cuda` image.

Two image-side settings are load-bearing:

- `NVIDIA_DRIVER_CAPABILITIES=compute,utility,graphics,display`. Upstream, the
  toolkit injects per requested capability and the default `compute,utility`
  set omits the GLX, EGL, and Vulkan ICD pieces. This cluster's extension mounts
  the whole userspace regardless — measured — so the value changes nothing here
  today; it is declared so a future extension bump that starts honouring it
  cannot silently take the render path away.
- `__GLX_VENDOR_LIBRARY_NAME=nvidia`. **GLVND asks the X server which GLX vendor
  to use, and a dummy server can only answer "Mesa"** — so without this, every
  GL context in the rig, the game's included, lands on llvmpipe while the card
  sits idle. Measured on the rig node (node-06, RTX 3080 Ti): unset gives
  `GL_RENDERER` `llvmpipe`, set gives `NVIDIA GeForce RTX 3080 Ti/PCIe/SSE2` on
  the same server. First seen on a workstation RTX 5080 and re-measured here —
  a different card, driver and injection mechanism is not evidence about this
  node, and only the node-06 run is. Vulkan needs no
  equivalent — it finds the card through the ICD, which is why the GPU claim
  leads with `vulkaninfo`.

## What the pod needs: privilege, and a live `/dev/input`

Privilege, for three device-level capabilities the GPU runtime class does not
provide:

- **`/dev/uinput`** — creating the virtual keyboard at all.
- **`/dev/input/event*`** — the container's device cgroup otherwise denies
  `open()` on the event nodes with `EPERM`, so the Xorg evdev driver cannot bind
  the device (and cannot `EVIOCGRAB` it, which is what keeps the rig's synthetic
  input from being read by anything else).
- **a console** — the X server opens a VT even with the dummy driver.

And, separately, the **host's `/dev/input` mounted live**. Privilege alone is
not enough: a container's own `/dev` is populated once at startup, so the event
node the rig creates *after* that — which is the only node it cares about — is
simply invisible inside the container. Without the mount the rig fails at setup
with `uinput helper never reported an event node`, before any claim runs.

GPU access is orthogonal to both: it comes from the pod's `runtimeClassName` and
GPU resource request.

## The self-test's control structure

`entrypoint.sh --self-test` runs three claims and exits non-zero unless every
one is `PASS`. Each prints one verdict line — `PASS`, `FAIL`, or
**`DID-NOT-MEASURE`**, which is neither.

That third verdict is the point of the design. Each claim is built so that a
broken *instrument* cannot be mistaken for a broken *substrate*:

- **`gpu-render`** asserts `vulkaninfo --summary` reports an NVIDIA physical
  device (`deviceName` and `driverName` both), then asserts `GL_RENDERER` does
  not match `llvmpipe|swrast|softpipe`. The string check is not belt-and-braces:
  it is the *only* discriminator, because the two paths produce identical
  pixels. No ICD at all reports DID-NOT-MEASURE; an ICD that answers with a
  software rasterizer is a FAIL.
- **`input-lands`** runs a **positive control first**. It injects over XTEST
  (`xdotool`) and asserts the receiver sees it. Only if the control lands does
  the uinput injection run, and the assertion is a **delta** at the receiver —
  count before, inject *n*, require the count to rise by *n*. A control that
  never lands makes the uinput result meaningless, so the claim reports
  DID-NOT-MEASURE, not FAIL.
- **`wine-gui-input`** launches `wine notepad` (a real Windows PE binary), waits
  for its X window, captures the frame, focuses the window, injects over
  **uinput**, and captures again. It asserts the first frame is not uniformly
  one colour and that the two frames differ by more than a floor of pixels.

Two rules run through all of it:

- **Assertions are read at the receiver, never from the injector's exit code.**
  A clean injector exit proves only that bytes were written to a device. That
  exact false pass was observed.
- **Deltas, not absolutes.** Every count is taken against a baseline captured
  immediately before the action, so unrelated traffic cannot manufacture a pass.

Two supporting details exist for the same reason. The root window is painted a
solid colour at startup, because X's default root is a two-colour stipple weave
that would make a blank frame indistinguishable from a rendered one under a
"more than one colour" test. And the Wine frame comparison is a pixel **count**
against a floor, not a boolean, because a blinking text caret changes a few
dozen pixels entirely on its own — "the frames differ" is also true of a window
that received nothing.

`src/rig-probe.py` carries the two measurements shell cannot make: the uinput
device (created, held open, and injected on demand over a stdin command loop,
because the device must exist *before* Xorg starts) and the xwd capture
analysis.

### Xorg log lines that are not failures

```
(II) XINPUT: Adding extended input device "eso-rig-keyboard" (type: KEYBOARD, id 6)
(WW) evdev: eso-rig-keyboard: device file is duplicate. Ignoring.
(EE) PreInit returned 8 for "eso-rig-keyboard"
```

Xorg registers the one named input device twice — as the layout's listed device
and again as the implicit core keyboard — and refuses the second attempt. The
first add stays live and events flow through it, as the `input-lands` claim
proves on every run. Expected, not a failure.

## Modes and knobs

- **default (no argument)** — writes the Xorg config and runs the server in the
  foreground. `ESO_RIG_INPUT_DEVICE` names an event node to bind; it must
  already exist when the server starts, because hotplug is off (that is what
  makes the explicit `InputDevice` section authoritative).
- **`--self-test`** — the acceptance above. Exit `0` all-PASS, `1` if any claim
  did not pass, `2` on a tool/setup error.
- `ESO_RIG_DISPLAY` (default `:99`), `ESO_RIG_GEOMETRY` (default `1920x1080`),
  `ESO_RIG_RUN_DIR` (default `/run/eso-rig`) — the run dir holds the generated
  `xorg.conf`, `Xorg.log`, `wine.log`, and the self-test's captures.

## Build / publish path

- [`Containerfile`](Containerfile) — `FROM ubuntu:24.04`, the display + input +
  Wine + probe-tool package set, and a build-time smoke that proves the dummy
  driver, the evdev driver, `notepad.exe`, and every probe binary are on disk.
  The GPU itself is unprovable at build time (the BuildKit builder has no card
  and no injected driver), so every GPU claim is deferred to `--self-test`.
- [`bin/eso-rig-cluster-publish.sh`](bin/eso-rig-cluster-publish.sh) — the one
  committed way to (re)build. Runs from the workstation over the tailnet
  against cluster BuildKit (`buildkit.buildkit.svc.cluster.local:1234`) and
  pushes the stable `:serving` tag to the in-cluster registry
  (`registry.registry.svc.cluster.local:5000/cluster/eso-rig:serving`).
  `:serving` is stable, matching the GPU precedent `@infra/upscale` and
  `@infra/voice-infer` set: per-commit tags would fill the registry's 50Gi PV. Rebuild and re-publish whenever `src/` or the
  `Containerfile` changes — and roll the workload by hand afterwards, because a
  running pod only pulls `:serving` again when a pod is recreated.

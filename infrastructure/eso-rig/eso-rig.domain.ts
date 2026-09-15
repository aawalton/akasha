import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const esoRig = {
  id: "01a06866-58f8-7e5f-853a-325ce7e59667",
  type: "page-type/domain",
  slug: "eso-rig",
  definition: "the substrate a Windows game client runs on with no display, keyboard or human",
  parts: [
    "container-recipe/eso-rig-image",
    "manifest/eso-rig-manifests",
    "python-module/eso-rig-probe",
    "shell-script/eso-rig-entrypoint",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "The substrate has no game.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The substrate has no controller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The substrate has no policy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each thing the rig must do has a silent failure that looks like success.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A frame a software rasterizer drew is pixel-identical to a frame the card drew.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An injector writing to a device nobody reads exits zero.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A screen capture of nothing is still a screen capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The X server is Xorg.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Xvfb has no evdev or libinput input backend.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Xvfb takes XTEST alone.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Xvfb can neither open nor consume a device node under /dev/input.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A uinput device is the one input a Windows client cannot tell from hardware.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The dummy video driver gives the framebuffer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The evdev input driver opens the event node.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The image ships no NVIDIA userspace.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The node injects the whole NVIDIA driver userspace into the container at runtime.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Driver userspace matches the running kernel driver exactly.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A second mismatched userspace on the loader path falls silently back to software.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image declares the driver capability list this cluster ignores.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "GLVND asks the X server for a GLX vendor.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A dummy X server answers Mesa and no other GLX vendor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image names the GLX vendor so no GL context lands on llvmpipe.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A driver reading taken on another card is no evidence about the rig's card.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A driver reading taken under another injection mechanism is no evidence here.",
    },
  ],
} as const satisfies Domain

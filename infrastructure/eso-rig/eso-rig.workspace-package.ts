import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const esoRig = {
  id: "01a06866-58f8-7e5f-853a-325ce7e59667",
  pageTypeSlug: "workspace-package",
  slug: "eso-rig",
  definition: "the substrate a Windows game client runs on with no display, keyboard or human",
  manifest: "json",
  partSlugs: [
    "container-recipe/eso-rig-image",
    "python-module/eso-rig-probe",
    "shell-script/eso-rig-cluster-publish",
    "shell-script/eso-rig-entrypoint",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "The substrate holds no game.",
    },
    {
      invariantKind: "absence",
      statement: "The substrate holds no controller.",
    },
    {
      invariantKind: "absence",
      statement: "The substrate holds no policy.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing the rig must do has a silent failure that looks like success.",
    },
    {
      invariantKind: "constraint",
      statement: "A frame a software rasterizer drew is pixel-identical to one the card drew.",
    },
    {
      invariantKind: "constraint",
      statement: "An injector writing to a device nobody reads exits zero.",
    },
    {
      invariantKind: "constraint",
      statement: "A screen capture of nothing is still a screen capture.",
    },
    {
      invariantKind: "departure",
      statement: "The X server is Xorg.",
    },
    {
      invariantKind: "constraint",
      statement: "Xvfb has no evdev or libinput input backend.",
    },
    {
      invariantKind: "constraint",
      statement: "Xvfb takes XTEST alone.",
    },
    {
      invariantKind: "constraint",
      statement: "Xvfb can neither open nor consume a device node under /dev/input.",
    },
    {
      invariantKind: "constraint",
      statement: "A uinput device is the one input a Windows client cannot tell from hardware.",
    },
    {
      invariantKind: "departure",
      statement: "The dummy video driver gives the framebuffer.",
    },
    {
      invariantKind: "departure",
      statement: "The evdev input driver opens the event node.",
    },
    {
      invariantKind: "absence",
      statement: "The image ships no NVIDIA userspace.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The node injects the whole NVIDIA driver userspace into the container at runtime.",
    },
    {
      invariantKind: "constraint",
      statement: "Driver userspace matches the running kernel driver exactly.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A second mismatched userspace on the loader path falls silently back to software.",
    },
    {
      invariantKind: "departure",
      statement: "The image declares the driver capability list this cluster ignores.",
    },
    {
      invariantKind: "constraint",
      statement: "GLVND asks the X server for a GLX vendor.",
    },
    {
      invariantKind: "constraint",
      statement: "A dummy X server answers Mesa and no other GLX vendor.",
    },
    {
      invariantKind: "departure",
      statement: "The image names the GLX vendor so no GL context lands on llvmpipe.",
    },
    {
      invariantKind: "constraint",
      statement: "A driver reading taken on another card is no evidence about the rig's card.",
    },
    {
      invariantKind: "constraint",
      statement: "A driver reading taken under another injection mechanism is no evidence here.",
    },
  ],
} as const satisfies WorkspacePackage

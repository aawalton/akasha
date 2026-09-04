import type { ShellScript } from "@akasha/code-system/shell-script"

export const esoRigEntrypoint = {
  id: "01a06866-58f8-7ecd-b4cb-5a4541c4ce02",
  pageTypeSlug: "shell-script",
  slug: "eso-rig-entrypoint",
  definition: "the X server the rig runs and the acceptance saying the substrate works",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "With no argument the script writes the X config and runs the server in front.",
    },
    {
      invariantKind: "constraint",
      statement: "The event node the script is told to bind exists before the X server starts.",
    },
    {
      invariantKind: "departure",
      statement: "Hotplug is off.",
    },
    {
      invariantKind: "departure",
      statement: "The named input device is the authority on what the X server reads input from.",
    },
    {
      invariantKind: "departure",
      statement: "The self-test exits 0 where every claim passed.",
    },
    {
      invariantKind: "departure",
      statement: "The self-test exits 1 where a claim did not pass.",
    },
    {
      invariantKind: "departure",
      statement: "The self-test exits 2 on a tool or setup error.",
    },
    {
      invariantKind: "departure",
      statement: "A claim says PASS or FAIL or DID-NOT-MEASURE.",
    },
    {
      invariantKind: "departure",
      statement: "DID-NOT-MEASURE is neither a PASS nor a FAIL.",
    },
    {
      invariantKind: "departure",
      statement: "A broken instrument reports DID-NOT-MEASURE rather than a broken substrate.",
    },
    {
      invariantKind: "departure",
      statement: "An assertion is read at the receiver and never from the injector's exit code.",
    },
    {
      invariantKind: "departure",
      statement: "Every count is a delta against a baseline taken immediately before the action.",
    },
    {
      invariantKind: "departure",
      statement: "The uinput injection runs only after an XTEST positive control has landed.",
    },
    {
      invariantKind: "departure",
      statement: "The root window is painted a solid color at startup.",
    },
    {
      invariantKind: "constraint",
      statement: "X's own default root window is a two-color stipple weave.",
    },
    {
      invariantKind: "departure",
      statement: "The Wine frames are compared as a pixel count against a floor.",
    },
    {
      invariantKind: "constraint",
      statement: "A blinking caret alone changes a few dozen pixels.",
    },
    {
      invariantKind: "departure",
      statement: "A software rasterizer named in GL_RENDERER is a FAIL.",
    },
    {
      invariantKind: "departure",
      statement: "An absent ICD reports DID-NOT-MEASURE rather than a FAIL.",
    },
    {
      invariantKind: "departure",
      statement: "A Wine prefix holding no registry stops the run.",
    },
    {
      invariantKind: "constraint",
      statement: "Xorg registers the one named input device twice and refuses the second.",
    },
    {
      invariantKind: "departure",
      statement: "The first registration stays live and carries every event the rig injects.",
    },
  ],
} as const satisfies ShellScript

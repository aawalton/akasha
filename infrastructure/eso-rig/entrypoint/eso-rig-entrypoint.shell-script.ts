import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const esoRigEntrypoint = {
  id: "01a06866-58f8-7ecd-b4cb-5a4541c4ce02",
  type: "page-type/shell-script",
  slug: "eso-rig-entrypoint",
  definition: "the X server the rig runs and the acceptance saying the substrate works",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "With no argument the script writes the X config and runs the server in front.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The event node the script is told to bind exists before the X server starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Hotplug is off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The named input device is the authority on the event node the X server reads input from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The self-test exits 0 where every claim passed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The self-test exits 1 where a claim did not pass.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The self-test exits 2 on a tool or setup error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim says PASS or FAIL or DID-NOT-MEASURE.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "DID-NOT-MEASURE is neither a PASS nor a FAIL.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A broken instrument reports DID-NOT-MEASURE rather than a broken substrate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assertion is read at the receiver and never from the injector's exit code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every count is a delta against a baseline taken immediately before the action.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The uinput injection runs only after an XTEST positive control has landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The root window is painted a solid color at startup.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "X's own default root window is a two-color stipple weave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Wine frames are compared as a pixel count against a floor.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A blinking caret alone changes a few dozen pixels.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A software rasterizer named in GL_RENDERER is a FAIL.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent ICD reports DID-NOT-MEASURE rather than a FAIL.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Wine prefix with no registry stops the run.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Xorg registers the named input device twice and refuses the second registration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first registration stays live and has every event the rig injects.",
    },
  ],
} as const satisfies ShellScript

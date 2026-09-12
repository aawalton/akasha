import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimTap = {
  id: "01a0685d-ceae-700d-a860-a518622e0d4a",
  type: "command",
  slug: "mobile-sim-tap",
  definition: "the command tapping the simulator screen the way a finger would",
  code: "ts",
  taking: [
    { said: "--selector <css>", takes: "the element to tap, found by CSS in the webview" },
    { said: "--y <px>", takes: "how far down the viewport to tap, with `--x`" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An element no selector finds is refused rather than tapped at nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A call names either an element or a point.",
    },
    {
      invariantKind: "departure",
      statement: "An element and a point named together are refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A point is an across and a down.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is native rather than a click in the page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "tap",
  arguments: [{ argument: "argument/x" }],
} as const satisfies Command

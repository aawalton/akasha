import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimTap = {
  id: "01a0685d-ceae-700d-a860-a518622e0d4a",
  type: "page-type/command",
  slug: "mobile-sim-tap",
  definition: "the command tapping the simulator screen the way a finger would",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An element no selector finds is refused rather than tapped at nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call names either an element or a point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An element and a point named together are refused rather than chosen between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A point is an across and a down.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tap is native rather than a click in the page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the context switch attaching to the webview already made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tap is named as sent before that tap goes out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw on the send names that send in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The session, the finding, the clicking and the pointing are handed in.",
    },
  ],
  name: "tap",
  arguments: [
    { argument: "argument/x" },
    { argument: "argument/y" },
    { argument: "argument/selector", notWith: ["argument/x", "argument/y"] },
  ],
} as const satisfies Command

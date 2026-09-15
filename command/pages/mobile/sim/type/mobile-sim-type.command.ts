import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimType = {
  id: "01a0685d-ceae-700f-89c3-712a8a6e7252",
  type: "command",
  slug: "mobile-sim-type",
  definition: "the command typing text into the simulator's webview",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An element named is tapped before anything is typed into that element.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The element tapped is named as soon as that element is tapped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A typing that threw after that tap names the tap in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The text is named as sent before that text is sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A typing that threw on the send names that send in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no element names the send into the element already focused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The session, the finding, the tapping and the typing are handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no element types into the element already focused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many characters went in is the answer rather than the text.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "type",
  arguments: [
    { argument: "argument/selector" },
    { argument: "argument/typed-text", required: true },
  ],
} as const satisfies Command

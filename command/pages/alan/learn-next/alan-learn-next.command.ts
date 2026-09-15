import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanLearnNext = {
  id: "01a077e6-d20c-7398-9b0e-d8ecbb15cba7",
  type: "page-type/command",
  slug: "alan-learn-next",
  definition: "the command naming the first unopened leaf of Learn Everything along a fixed sweep",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A leaf is a topic no other topic sits under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A leaf is opened where its status is anything but unopened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The order the leaves are walked in is fixed in advance rather than drawn afresh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That order is the same whichever leaves are opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One leaf is handed back rather than a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A book whose every leaf is opened is refused rather than answered empty.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "learn-next",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command

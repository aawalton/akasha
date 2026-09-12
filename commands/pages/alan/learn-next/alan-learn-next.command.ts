import type { Command } from "akasha/commands/command.page-type.types.ts"

export const alanLearnNext = {
  id: "01a077e6-d20c-7398-9b0e-d8ecbb15cba7",
  type: "command",
  slug: "alan-learn-next",
  definition:
    "the command naming the first unopened leaf of the Book of Everything along a fixed sweep",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--json",
      takes: "give the leaf as one line of JSON rather than as a tab-separated row",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leaf is a topic no other topic sits under.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf is opened where its status is anything but unopened.",
    },
    {
      invariantKind: "departure",
      statement: "The order the leaves are walked in is fixed in advance rather than drawn afresh.",
    },
    {
      invariantKind: "departure",
      statement: "That order is the same whichever leaves are opened.",
    },
    {
      invariantKind: "departure",
      statement: "One leaf is handed back rather than a list.",
    },
    {
      invariantKind: "departure",
      statement: "A book whose every leaf is opened is refused rather than answered empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "learn-next",
} as const satisfies Command

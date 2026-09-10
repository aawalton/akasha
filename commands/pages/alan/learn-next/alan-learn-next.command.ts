import type { Command } from "../../../command.page-type.types.ts"

export const alanLearnNext = {
  id: "01a077e6-d20c-7398-9b0e-d8ecbb15cba7",
  pageTypeSlug: "command",
  type: "command",
  slug: "alan-learn-next",
  definition: "the first unopened leaf of the Book of Everything along a sweep fixed in advance",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--json",
      takes: "give the leaf as one line of JSON rather than as a tab-separated row",
    },
  ],
  helpNotes: [
    "a leaf is a topic no other topic names as the topic it sits under.",
    "the sweep is drawn from a seed written into the code, so the leaf handed back keeps coming back until that leaf is opened.",
    "a leaf is opened where its status is anything other than unopened.",
    "the sweep covers every leaf, so which leaves are opened moves the place reached rather than the order.",
  ],
  invariants: [
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
} as const satisfies Command

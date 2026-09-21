import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unheardPicking = {
  id: "01a0c4eb-23e1-79fd-ad89-53de5dd968d6",
  type: "page-type/module",
  slug: "unheard-picking",
  definition: "the tracks a followed artist made that Alan has not heard",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Alan has heard is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other rule of this picking is the track-picking module's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module

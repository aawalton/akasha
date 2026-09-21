import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ungradedPicking = {
  id: "01a0c581-61af-764e-8d72-3588a1f73858",
  type: "page-type/module",
  slug: "ungraded-picking",
  definition: "the tracks a followed artist made that Alan has heard and has not graded",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Alan has not heard is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track stating a rank is never picked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track stating an empty rank is picked.",
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

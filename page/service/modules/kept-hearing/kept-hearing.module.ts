import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keptHearing = {
  id: "01a18459-91e4-75dd-9d09-7a3952a996c3",
  type: "page-type/module",
  slug: "kept-hearing",
  definition: "the folders heard for the files computed properties keep, and who each one reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan changes the folders heard only for a kept file whose index changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept file heard reaches the follows the last plan aimed at it.",
    },
  ],
  createdAt: "2026-10-28T21:10:24.995Z",
  updatedAt: "2026-10-28T21:10:24.995Z",
} as const satisfies Module

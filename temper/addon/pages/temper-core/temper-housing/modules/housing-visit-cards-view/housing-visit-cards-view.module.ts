import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingVisitCardsView = {
  id: "01a06113-b7d3-7108-b73c-002d1663f7df",
  type: "page-type/module",
  slug: "housing-visit-cards-view",
  definition: "a visit-card row's control shapes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-02T07:44:37.331Z",
  updatedAt: "2026-09-22T13:49:27.000Z",
} as const satisfies Module

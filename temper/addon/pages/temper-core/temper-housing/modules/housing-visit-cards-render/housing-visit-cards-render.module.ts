import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingVisitCardsRender = {
  id: "01a06128-d5d6-7c5b-a636-be1909ea5a7d",
  type: "page-type/module",
  slug: "housing-visit-cards-render",
  definition: "drawing one row for each received visit card",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A received card is kept in saved variables until the player removes that card.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.270Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

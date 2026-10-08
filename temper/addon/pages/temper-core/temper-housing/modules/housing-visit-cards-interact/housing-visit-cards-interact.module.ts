import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingVisitCardsInteract = {
  id: "01a06128-d5d6-7897-939f-8aa6659a7dcf",
  type: "page-type/module",
  slug: "housing-visit-cards-interact",
  definition: "what clicking a received visit card does",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One card is selected at a time.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.270Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

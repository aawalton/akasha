import type { Module } from "@akasha/code-system/module"

export const housingVisitCardsView = {
  id: "01a06113-b7d3-7108-b73c-002d1663f7df",
  pageTypeSlug: "module",
  slug: "housing-visit-cards-view",
  definition: "the control shapes a visit-card row is made of",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module

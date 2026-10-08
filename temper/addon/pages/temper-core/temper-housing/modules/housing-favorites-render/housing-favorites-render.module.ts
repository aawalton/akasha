import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingFavoritesRender = {
  id: "01a06128-d5cd-747f-9722-dadfc96875d3",
  type: "page-type/module",
  slug: "housing-favorites-render",
  definition: "drawing one row for each favourite house in the house tab",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows are made once and reused as the list changes.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.261Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module

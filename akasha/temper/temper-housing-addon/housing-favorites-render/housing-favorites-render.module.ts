import type { Module } from "@akasha/code-system/module"

export const housingFavoritesRender = {
  id: "01a06128-d5cd-747f-9722-dadfc96875d3",
  pageTypeSlug: "module",
  slug: "housing-favorites-render",
  definition: "drawing one row for each favourite house in the house tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Rows are made once and reused as the list changes.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipeListCatalogLoading = {
  id: "01a0de64-3221-7c8d-8cff-a6ad56a8eb9f",
  type: "page-type/module",
  slug: "recipe-list-catalog-loading",
  definition: "the read that fills the held recipe catalogue from the recipe list pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue already held is answered rather than read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a recipe list page reads the catalogue again.",
    },
  ],
  createdAt: "2026-09-26T15:45:03.521Z",
  updatedAt: "2026-09-26T16:46:52.000Z",
} as const satisfies Module

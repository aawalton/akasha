import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiSearchFavorites = {
  id: "01a06231-8f1d-7d17-ae81-fec3b0c44f96",
  type: "page-type/module",
  slug: "sets-core-api-search-favorites",
  definition: "the favorite categories for starring a set search result",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "No addon adds a second search results context menu entry.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.205Z",
  updatedAt: "2026-09-22T13:44:02.000Z",
} as const satisfies Module

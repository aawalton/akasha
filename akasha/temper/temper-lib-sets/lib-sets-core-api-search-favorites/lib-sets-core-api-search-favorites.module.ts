import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiSearchFavorites = {
  id: "01a06231-8f1d-7d17-ae81-fec3b0c44f96",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-search-favorites",
  definition: "the favorite categories a set search result can be starred into",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "No addon adds a second search results context menu entry.",
    },
  ],
} as const satisfies Module

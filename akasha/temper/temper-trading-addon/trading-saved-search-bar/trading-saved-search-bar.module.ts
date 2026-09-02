import type { Module } from "@akasha/code-system/module"

export const tradingSavedSearchBar = {
  id: "01a06160-2a5c-7023-b9e8-db3415a32e0a",
  pageTypeSlug: "module",
  slug: "trading-saved-search-bar",
  definition: "the bar a player picks a named search from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The active search is marked in the bar rather than named elsewhere.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSavedSearchStore = {
  id: "01a06160-2a5c-7345-a7bf-ba9b15501951",
  type: "page-type/module",
  slug: "trading-saved-search-store",
  definition: "the searches a player named and keeps, and which of them is active",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Renaming a search leaves its place in the list.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.388Z",
  updatedAt: "2026-09-22T02:36:59.000Z",
} as const satisfies Module

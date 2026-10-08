import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingSearchRequestNative = {
  id: "01a06160-2a5c-7131-9d9b-e1b27ea4e7cd",
  type: "page-type/module",
  slug: "trading-search-request-native",
  definition: "handing a collected filter set to the game's own guild store search",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own search does the narrowing the filters ask for.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.388Z",
  updatedAt: "2026-09-22T02:36:59.000Z",
} as const satisfies Module

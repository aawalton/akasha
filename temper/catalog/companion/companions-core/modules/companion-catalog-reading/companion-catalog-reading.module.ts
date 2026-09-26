import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionCatalogReading = {
  id: "01a0de75-be50-74f6-a0b1-b0ea17d991c0",
  type: "page-type/module",
  slug: "companion-catalog-reading",
  definition: "the companion catalogue built from the rows of the pages it reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One list names every page type the catalogue reads and the keys it reads of each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A server, a browser and a test build the catalogue from their rows alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a page, so the caller hands in the rows of each page type.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionCatalogLoading = {
  id: "01a0cb08-a225-7b9e-8f96-42a64367f53a",
  type: "page-type/module",
  slug: "companion-catalog-loading",
  definition: "the read that fills the held companion catalogue from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue already held is answered rather than read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a page of any type the catalogue reads reads the catalogue again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reading the catalogue is apart from holding it, so a reader with no pages reaches it.",
    },
  ],
} as const satisfies Module

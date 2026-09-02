import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const loreLibraryCatalogCapture = {
  id: "01a060e2-3184-7000-83bf-82062963f749",
  pageTypeSlug: "module",
  slug: "lore-library-catalog-capture",
  definition:
    "the lore library books by category and collection, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Books are asked for by index up to a fixed ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "The game gives no count of the books in a collection.",
    },
    {
      invariantKind: "departure",
      statement: "A collection holding no named book is left out.",
    },
  ],
} as const satisfies Module

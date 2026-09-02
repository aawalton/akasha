import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const collectiblesCatalogCapture = {
  id: "01a060e2-3183-736c-b68e-33f414a5785c",
  pageTypeSlug: "module",
  slug: "collectibles-catalog-capture",
  definition: "the collectibles by category, read in batches into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Collectibles are read in batches so the client keeps its frame rate.",
    },
    {
      invariantKind: "departure",
      statement: "A collectible the game blacklists is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A category holding no collectible is dropped before the write.",
    },
  ],
} as const satisfies Module

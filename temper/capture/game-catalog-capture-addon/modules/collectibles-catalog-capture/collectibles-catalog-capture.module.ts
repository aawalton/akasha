import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectiblesCatalogCapture = {
  id: "01a060e2-3183-736c-b68e-33f414a5785c",
  type: "page-type/module",
  slug: "collectibles-catalog-capture",
  definition: "the collectibles by category, read in batches into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Collectibles are read in batches so the client keeps its frame rate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collectible the game blacklists is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category with no collectible is dropped before the write.",
    },
  ],
  createdAt: "2026-09-02T06:50:31.683Z",
  updatedAt: "2026-09-21T15:12:26.000Z",
} as const satisfies Module

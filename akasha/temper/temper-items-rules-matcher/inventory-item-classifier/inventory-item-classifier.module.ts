import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryItemClassifier = {
  id: "01a06151-370b-7703-ac80-b90c8331ef9a",
  pageTypeSlug: "module",
  slug: "inventory-item-classifier",
  definition: "which category tree nodes one captured item falls under, and where the item lies",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item falls under every node the item's own type and traits reach.",
    },
  ],
} as const satisfies Module

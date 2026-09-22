import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryWritCraftingAlchemy = {
  id: "01a06258-b535-7d7b-8d87-74ba5972c20f",
  type: "page-type/module",
  slug: "inventory-writ-crafting-alchemy",
  definition: "resolving an alchemy writ or master writ into the solvent and reagents for crafting",
  code: "ts",
} as const satisfies Module

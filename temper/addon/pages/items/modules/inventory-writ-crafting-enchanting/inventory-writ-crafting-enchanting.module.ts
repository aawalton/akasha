import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryWritCraftingEnchanting = {
  id: "01a06258-b535-767f-9335-727a86df2980",
  type: "page-type/module",
  slug: "inventory-writ-crafting-enchanting",
  definition: "resolving an enchanting writ or master writ into the runes it needs",
  code: "ts",
} as const satisfies Module

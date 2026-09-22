import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySlotKey = {
  id: "01a06267-2a3a-74b2-b07d-ff1fc7dcfd64",
  type: "page-type/module",
  slug: "inventory-slot-key",
  definition: "the number a bag and slot pair is keyed by in every pending-action map",
  code: "ts",
} as const satisfies Module

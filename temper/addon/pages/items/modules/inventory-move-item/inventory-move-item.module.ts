import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryMoveItem = {
  id: "01a06267-2a3a-7e2c-9719-6644235937c6",
  type: "page-type/module",
  slug: "inventory-move-item",
  definition:
    "moving a stack between two slots through the protected call when the game requires it",
  code: "ts",
  createdAt: "2026-09-02T13:55:23.322Z",
  updatedAt: "2026-09-21T17:37:10.000Z",
} as const satisfies Module

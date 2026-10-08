import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBagScanner = {
  id: "01a06258-b527-7879-be77-819a741fb9ac",
  type: "page-type/module",
  slug: "inventory-bag-scanner",
  definition:
    "reading every slot of a bag, whether it is a real bag, the craft bag, or an iterated one",
  code: "ts",
  createdAt: "2026-09-02T13:39:35.847Z",
  updatedAt: "2026-09-22T10:07:46.000Z",
} as const satisfies Module

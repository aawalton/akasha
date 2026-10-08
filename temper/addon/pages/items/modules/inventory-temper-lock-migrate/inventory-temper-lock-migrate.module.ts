import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTemperLockMigrate = {
  id: "01a06258-b534-79fe-8755-b39b437e39b1",
  type: "page-type/module",
  slug: "inventory-temper-lock-migrate",
  definition: "moving the older lock table into the temper locks",
  code: "ts",
  createdAt: "2026-09-02T13:39:35.860Z",
  updatedAt: "2026-09-21T17:37:10.000Z",
} as const satisfies Module

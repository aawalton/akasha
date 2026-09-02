import type { Module } from "@akasha/code-system/module"

export const inventoryTemperLockStore = {
  id: "01a06258-b534-7461-bb89-2fea2828c034",
  pageTypeSlug: "module",
  slug: "inventory-temper-lock-store",
  definition: "the temper locks kept in saved variables, keyed by slot",
  code: "ts",
} as const satisfies Module

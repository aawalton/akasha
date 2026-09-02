import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMigrations = {
  id: "01a0636c-5d9b-77bf-a596-9a698e6b001e",
  pageTypeSlug: "module",
  slug: "inventory-rule-migrations",
  definition: "an older inventory rule read into the shape the rules take now",
  code: "ts",
} as const satisfies Module

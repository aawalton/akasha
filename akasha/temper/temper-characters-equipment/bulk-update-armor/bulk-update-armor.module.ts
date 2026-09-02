import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const bulkUpdateArmor = {
  id: "01a0616f-8e1a-7fdf-b4b1-8e70a061f65f",
  pageTypeSlug: "module",
  slug: "bulk-update-armor",
  definition: "every armor slot given the same gear set or the same quality at once",
  code: "ts",
} as const satisfies Module

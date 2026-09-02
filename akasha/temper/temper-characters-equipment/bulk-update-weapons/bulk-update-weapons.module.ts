import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const bulkUpdateWeapons = {
  id: "01a0616f-8e1b-7382-90cc-84c8810088be",
  pageTypeSlug: "module",
  slug: "bulk-update-weapons",
  definition: "every weapon slot given the same gear set or the same quality at once",
  code: "ts",
} as const satisfies Module

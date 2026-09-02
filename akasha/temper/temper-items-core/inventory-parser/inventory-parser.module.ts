import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryParser = {
  id: "01a060c5-3c22-7fe6-8e12-c63f5595790d",
  pageTypeSlug: "module",
  slug: "inventory-parser",
  definition: "the rows an inventory capture holds, read out of a saved variables body",
  code: "ts",
} as const satisfies Module

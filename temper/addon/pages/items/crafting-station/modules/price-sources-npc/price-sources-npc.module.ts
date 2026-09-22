import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const priceSourcesNpc = {
  id: "01a0615d-c21b-71c6-af18-6daf1799bdbc",
  type: "page-type/module",
  slug: "price-sources-npc",
  definition: "a game vendor's buying or selling price for an item",
  code: "ts",
} as const satisfies Module

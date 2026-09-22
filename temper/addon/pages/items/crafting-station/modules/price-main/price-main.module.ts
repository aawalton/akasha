import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const priceMain = {
  id: "01a0615d-c21a-752e-b416-eb8572f56a48",
  type: "page-type/module",
  slug: "price-main",
  definition: "the order this library's modules load in",
  code: "ts",
} as const satisfies Module

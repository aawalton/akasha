import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const priceState = {
  id: "01a0615d-c21c-7ade-9238-82472ae69733",
  type: "page-type/module",
  slug: "price-state",
  definition: "the library object holding every other module's functions",
  code: "ts",
} as const satisfies Module

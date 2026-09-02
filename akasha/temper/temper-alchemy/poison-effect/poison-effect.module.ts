import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const poisonEffect = {
  id: "01a06076-1b69-7a7a-8c58-b53cbaa5cbb6",
  pageTypeSlug: "module",
  slug: "poison-effect",
  definition: "every effect an alchemy reagent carries, with the buff or number it applies",
  code: "ts",
} as const satisfies Module

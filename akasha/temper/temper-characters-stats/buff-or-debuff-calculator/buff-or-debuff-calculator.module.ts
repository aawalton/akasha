import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buffOrDebuffCalculator = {
  id: "01a06133-c630-7196-9b15-0494a9125cf0",
  pageTypeSlug: "module",
  slug: "buff-or-debuff-calculator",
  definition: "the buffs and debuffs the effect sources of a character build put in play",
  code: "ts",
} as const satisfies Module

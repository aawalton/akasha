import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const debuffsMajor = {
  id: "01a06070-82df-7dc0-8d8f-83d4eb516f00",
  pageTypeSlug: "module",
  slug: "debuffs-major",
  definition: "the Major debuffs the game applies",
  code: "ts",
} as const satisfies Module

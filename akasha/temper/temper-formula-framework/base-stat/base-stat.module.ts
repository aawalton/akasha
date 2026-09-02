import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const baseStat = {
  id: "01a06070-82dc-7362-bd7b-ae43bdc4ac29",
  pageTypeSlug: "module",
  slug: "base-stat",
  definition: "the numbers a character starts from before any effect changes them",
  code: "ts",
} as const satisfies Module

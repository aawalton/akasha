import type { Module } from "@akasha/code-system/module"

export const writEnchantingParser = {
  id: "01a061c7-e895-7e06-9ce6-59c03a5d6a74",
  pageTypeSlug: "module",
  slug: "writ-enchanting-parser",
  definition: "reads an enchanting writ and says what it asks for",
  code: "ts",
} as const satisfies Module

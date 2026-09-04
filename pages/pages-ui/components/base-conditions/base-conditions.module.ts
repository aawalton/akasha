import type { Module } from "@akasha/code-system/module"

export const baseConditions = {
  id: "01a05cba-9cbb-7b2f-8bb6-ade427f2c6c8",
  pageTypeSlug: "module",
  slug: "base-conditions",
  definition: "the conditions every query for a view starts from",
  code: "ts",
} as const satisfies Module

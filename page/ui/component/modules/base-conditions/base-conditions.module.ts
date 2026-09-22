import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const baseConditions = {
  id: "01a05cba-9cbb-7b2f-8bb6-ade427f2c6c8",
  type: "page-type/module",
  slug: "base-conditions",
  definition: "the starting conditions of every query for a view",
  code: "ts",
} as const satisfies Module

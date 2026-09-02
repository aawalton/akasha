import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const locationCondition = {
  id: "01a060d9-498c-7978-b6f9-1baeddcf9e33",
  pageTypeSlug: "module",
  slug: "location-condition",
  definition: "the place a rule tests against, read off a location key and a bag number",
  code: "ts",
} as const satisfies Module

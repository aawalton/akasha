import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writAlchemyParser = {
  id: "01a061c7-e894-7a5b-ad70-177ed293d8e2",
  type: "page-type/module",
  slug: "writ-alchemy-parser",
  definition: "reads an alchemy writ and says what that writ needs",
  code: "ts",
} as const satisfies Module

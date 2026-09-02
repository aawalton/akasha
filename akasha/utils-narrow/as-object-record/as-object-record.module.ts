import type { Module } from "../../code-system/modules/module.page-type.ts"

export const asObjectRecord = {
  id: "01a06057-3679-70cf-b69b-52e57b9172af",
  pageTypeSlug: "module",
  slug: "as-object-record",
  definition: "a value read as an object of unknown values, or nothing where the value is not one",
  code: "ts",
} as const satisfies Module

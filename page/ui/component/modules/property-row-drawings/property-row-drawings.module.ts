import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyRowDrawings = {
  id: "01a0a0d2-7a71-7a5a-b794-6e66aa91cee0",
  type: "page-type/module",
  slug: "property-row-drawings",
  definition:
    "the row each page type draws a property's label with its value as, taken by the bundler",
  code: "ts",
} as const satisfies Module

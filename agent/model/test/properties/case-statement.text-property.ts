import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const caseStatement = {
  id: "01a05f8d-eaa0-7001-b0f2-8a72345756d0",
  type: "page-type/text-property",
  slug: "case-statement",
  propertySlug: "statement",
  definition: "the text a case sends to a model",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

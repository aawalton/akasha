import type { TextProperty } from "@akasha/pages-system/text-property"

export type CaseStatement = string

export const caseStatement = {
  id: "01a05f8d-eaa0-7001-b0f2-8a72345756d0",
  pageTypeSlug: "text-property",
  slug: "case-statement",
  propertySlug: "statement",
  definition: "what a case puts to a model about the page the case names",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

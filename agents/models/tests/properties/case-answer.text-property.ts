import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CaseAnswer = "YES" | "NO"

export const caseAnswer = {
  id: "01a05f8d-eaa0-7002-a100-b3b93772ca57",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "case-answer",
  propertySlug: "answer",
  definition: "the answer a case is labelled with",
  maxLength: 3,
  nameFormat: null,
} as const satisfies TextProperty

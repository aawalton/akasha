import type { TextProperty } from "@akasha/pages-system/text-property"

export type CaseAnswer = "YES" | "NO"

export const caseAnswer = {
  id: "01a05f8d-eaa0-7002-a100-b3b93772ca57",
  pageTypeSlug: "text-property",
  slug: "case-answer",
  propertySlug: "answer",
  definition: "the answer a case is labelled with",
  max: 3,
  nameFormatSlug: null,
} as const satisfies TextProperty

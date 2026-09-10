import type { SelectProperty } from "../../../../pages/select-properties/select-property.page-type.types.ts"

export type CaseAnswer = "YES" | "NO"

export const caseAnswer = {
  id: "01a05f8d-eaa0-7002-a100-b3b93772ca57",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "case-answer",
  propertySlug: "answer",
  definition: "the answer a case is labelled with",
  values: ["YES", "NO"],
} as const satisfies SelectProperty

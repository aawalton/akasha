import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const caseAnswer = {
  id: "01a05f8d-eaa0-7002-a100-b3b93772ca57",
  type: "page-type/select-property",
  slug: "case-answer",
  propertySlug: "answer",
  definition: "the value a case expects from a model",
  values: ["YES", "NO"],
  types: "ts",
} as const satisfies SelectProperty

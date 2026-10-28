import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const healthConditionName = {
  id: "01a183b0-fc74-755d-8fe2-39326739600e",
  type: "page-type/text-property",
  slug: "health-condition-name",
  propertySlug: "condition",
  definition: "the name of a health condition a person has",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-10-28T18:06:16.691Z",
  updatedAt: "2026-10-28T18:06:16.691Z",
} as const satisfies TextProperty

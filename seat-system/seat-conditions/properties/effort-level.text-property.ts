import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EffortLevel = string

export const effortLevel = {
  id: "01a06861-f664-75ef-9d6e-47a09eef368b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "effort-level",
  propertySlug: "effort-level",
  definition: "how much reasoning a seat spends before it answers",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type EffortLevel = string

export const effortLevel = {
  id: "01a06861-f664-75ef-9d6e-47a09eef368b",
  pageTypeSlug: "text-property",
  slug: "effort-level",
  propertySlug: "effort-level",
  definition: "how much reasoning a seat spends before it answers",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty

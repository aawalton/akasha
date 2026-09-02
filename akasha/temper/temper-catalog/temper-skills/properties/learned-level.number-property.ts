import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LearnedLevel = number

export const learnedLevel = {
  id: "01a05fca-cb83-7f8c-9b07-6dcd5c56c193",
  pageTypeSlug: "number-property",
  slug: "learned-level",
  propertySlug: "learned-level",
  definition: "the character level a skill is learned at",
  max: null,
} as const satisfies NumberProperty

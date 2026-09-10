import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Label = string

export const label = {
  id: "01a05446-e761-77bb-8bfc-c48892a1b249",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "label",
  propertySlug: "label",
  definition: "the name a reading is shown under",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

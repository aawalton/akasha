import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const label = {
  id: "01a05446-e761-77bb-8bfc-c48892a1b249",
  type: "page-type/text-property",
  slug: "label",
  propertySlug: "label",
  definition: "a reading's name",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

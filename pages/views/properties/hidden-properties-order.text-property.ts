import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const hiddenPropertiesOrder = {
  id: "01a0680d-4d00-700c-a856-2e9f4b7d410d",
  type: "text-property",
  slug: "hidden-properties-order",
  propertySlug: "hidden-properties-order",
  definition: "the properties a view hides, in the order a person would reach them",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type HiddenPropertiesOrder = List<string>

export const hiddenPropertiesOrder = {
  id: "01a0680d-4d00-700c-a856-2e9f4b7d410d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "hidden-properties-order",
  propertySlug: "hidden-properties-order",
  definition: "the properties a view hides, in the order a person would reach them",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

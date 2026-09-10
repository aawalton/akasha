import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Generation = string

export const generation = {
  id: "01a0659a-4bc5-7ccb-8f97-cab75f895117",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "generation",
  propertySlug: "generation",
  definition: "which generation of the nameplate this is",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type Generation = string

export const generation = {
  id: "01a0659a-4bc5-7ccb-8f97-cab75f895117",
  pageTypeSlug: "text-property",
  slug: "generation",
  propertySlug: "generation",
  definition: "which generation of the nameplate this is",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

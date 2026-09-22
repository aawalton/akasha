import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const abbreviation = {
  id: "01a05fce-1852-79ad-a22e-48e2939f64f0",
  type: "page-type/text-property",
  slug: "abbreviation",
  propertySlug: "abbreviation",
  definition: "a name's short form",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

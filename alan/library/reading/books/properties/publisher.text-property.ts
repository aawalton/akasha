import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const publisher = {
  id: "01a06741-dd0f-7002-ab36-1b19838e23db",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "publisher",
  propertySlug: "publisher",
  definition: "who put an edition out",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

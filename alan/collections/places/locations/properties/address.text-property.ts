import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const address = {
  id: "01a06583-acfb-7d78-a310-d5ad4ebf8a43",
  type: "text-property",
  slug: "address",
  propertySlug: "address",
  definition: "the street address of the place",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

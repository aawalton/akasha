import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Address = string

export const address = {
  id: "01a06583-acfb-7d78-a310-d5ad4ebf8a43",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "address",
  propertySlug: "address",
  definition: "the street address of the place",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

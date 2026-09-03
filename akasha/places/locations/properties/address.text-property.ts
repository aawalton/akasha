import type { TextProperty } from "@akasha/pages-system/text-property"

export type Address = string

export const address = {
  id: "01a06583-acfb-7d78-a310-d5ad4ebf8a43",
  pageTypeSlug: "text-property",
  slug: "address",
  propertySlug: "address",
  definition: "the street address of the place",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

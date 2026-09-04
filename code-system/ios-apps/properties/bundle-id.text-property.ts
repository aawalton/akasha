import type { TextProperty } from "@akasha/pages-system/text-property"

export type BundleId = string

export const bundleId = {
  id: "01a0597a-8eac-7076-83c7-0a77ea71e29b",
  pageTypeSlug: "text-property",
  slug: "bundle-id",
  propertySlug: "bundle-id",
  definition: "the name a phone knows an app by",
  max: 155,
  nameFormatSlug: null,
  unique: "page-type",
} as const satisfies TextProperty

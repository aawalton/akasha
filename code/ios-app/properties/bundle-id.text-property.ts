import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bundleId = {
  id: "01a0597a-8eac-7076-83c7-0a77ea71e29b",
  type: "page-type/text-property",
  slug: "bundle-id",
  propertySlug: "bundle-id",
  definition: "an app's name on a phone",
  maxLength: 155,
  nameFormat: null,
  unique: "unique-kind/page-type",
  types: "ts",
} as const satisfies TextProperty

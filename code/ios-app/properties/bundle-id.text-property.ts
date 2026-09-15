import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bundleId = {
  id: "01a0597a-8eac-7076-83c7-0a77ea71e29b",
  type: "text-property",
  slug: "bundle-id",
  propertySlug: "bundle-id",
  definition: "the name a phone knows an app by",
  maxLength: 155,
  nameFormat: null,
  unique: "unique-kind/page-type",
  types: "ts",
} as const satisfies TextProperty

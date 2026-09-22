import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const profileName = {
  id: "01a059b4-7acb-714e-a535-bcc8e1972c6a",
  type: "page-type/text-property",
  slug: "profile-name",
  propertySlug: "profile-name",
  definition: "a program's signing profile from Apple",
  maxLength: 100,
  nameFormat: null,
  unique: "unique-kind/page-type",
  types: "ts",
} as const satisfies TextProperty

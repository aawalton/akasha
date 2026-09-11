import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const profileName = {
  id: "01a059b4-7acb-714e-a535-bcc8e1972c6a",
  type: "text-property",
  slug: "profile-name",
  propertySlug: "profile-name",
  definition: "the profile Apple signs a program against",
  maxLength: 100,
  nameFormat: null,
  unique: "page-type",
  types: "ts",
} as const satisfies TextProperty

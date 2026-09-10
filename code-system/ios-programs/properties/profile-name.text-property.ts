import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ProfileName = string

export const profileName = {
  id: "01a059b4-7acb-714e-a535-bcc8e1972c6a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "profile-name",
  propertySlug: "profile-name",
  definition: "the profile Apple signs a program against",
  maxLength: 100,
  nameFormat: null,
  unique: "page-type",
} as const satisfies TextProperty

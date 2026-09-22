import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const appProfileName = {
  id: "01a068c9-394b-790f-b603-363f17400f93",
  type: "page-type/text-property",
  slug: "app-profile-name",
  propertySlug: "app-profile-name",
  definition: "an app's App Store profile",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

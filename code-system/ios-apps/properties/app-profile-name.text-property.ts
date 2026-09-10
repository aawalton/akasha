import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AppProfileName = string

export const appProfileName = {
  id: "01a068c9-394b-790f-b603-363f17400f93",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "app-profile-name",
  propertySlug: "app-profile-name",
  definition: "the App Store profile an app is signed with",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

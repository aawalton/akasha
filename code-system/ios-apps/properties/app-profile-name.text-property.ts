import type { TextProperty } from "@akasha/pages-system/text-property"

export type AppProfileName = string

export const appProfileName = {
  id: "01a068c9-394b-790f-b603-363f17400f93",
  pageTypeSlug: "text-property",
  slug: "app-profile-name",
  propertySlug: "app-profile-name",
  definition: "the App Store profile an app is signed with",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type DevelopmentTeam = string

export const developmentTeam = {
  id: "01a059b4-7aca-79c5-9a64-6da2aeab51bd",
  pageTypeSlug: "text-property",
  slug: "development-team",
  propertySlug: "development-team",
  definition: "the Apple team an app is built for",
  max: 10,
  nameFormatSlug: null,
} as const satisfies TextProperty

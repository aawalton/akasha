import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DevelopmentTeam = string

export const developmentTeam = {
  id: "01a059b4-7aca-79c5-9a64-6da2aeab51bd",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "development-team",
  propertySlug: "development-team",
  definition: "the Apple team an app is built for",
  maxLength: 10,
  nameFormat: null,
} as const satisfies TextProperty

import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const developmentTeam = {
  id: "01a059b4-7aca-79c5-9a64-6da2aeab51bd",
  type: "page-type/text-property",
  slug: "development-team",
  propertySlug: "development-team",
  definition: "an app's Apple team",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

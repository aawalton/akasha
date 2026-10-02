import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const picturedSetting = {
  id: "01a0fd84-f745-7bb6-8f34-507e2968fb92",
  type: "page-type/text-property",
  slug: "pictured-setting",
  propertySlug: "setting",
  definition: "the place a chapter's picture shows as a scene's setting",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

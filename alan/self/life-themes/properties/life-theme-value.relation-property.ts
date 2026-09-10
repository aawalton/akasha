import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type LifeThemeValue = Slug

export const lifeThemeValue = {
  id: "01a06575-c2c0-7ff7-823d-841339e34481",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "life-theme-value",
  propertySlug: "life-theme-value",
  definition: "the value a life theme is given over to",
  targetPageType: "page-type/value",
} as const satisfies RelationProperty

import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type LifeThemeValueSlug = Slug

export const lifeThemeValueSlug = {
  id: "01a06575-c2c0-7ff7-823d-841339e34481",
  pageTypeSlug: "relation-property",
  slug: "life-theme-value-slug",
  propertySlug: "life-theme-value-slug",
  definition: "the value a life theme is given over to",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty

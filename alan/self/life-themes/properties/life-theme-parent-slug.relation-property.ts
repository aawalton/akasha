import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type LifeThemeParentSlug = Slug

export const lifeThemeParentSlug = {
  id: "01a06575-c2c0-7056-ae18-c6709597f811",
  pageTypeSlug: "relation-property",
  slug: "life-theme-parent-slug",
  propertySlug: "life-theme-parent-slug",
  definition: "the life theme this one stands under",
  targetPageTypeSlug: "page-type/life-theme",
} as const satisfies RelationProperty

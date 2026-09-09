import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type LifeThemeParent = Slug

export const lifeThemeParent = {
  id: "01a06575-c2c0-7056-ae18-c6709597f811",
  pageTypeSlug: "relation-property",
  slug: "life-theme-parent",
  propertySlug: "life-theme-parent",
  definition: "the life theme this one is under",
  targetPageType: "page-type/life-theme",
} as const satisfies RelationProperty

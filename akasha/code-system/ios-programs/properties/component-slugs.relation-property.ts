import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ComponentSlugs = List<Slug>

export const componentSlugs = {
  id: "01a05821-5723-7bc2-86dc-1b02cd1edded",
  pageTypeSlug: "relation-property",
  slug: "component-slugs",
  propertySlug: "component-slugs",
  definition: "the components a program compiles",
  targetPageTypeSlug: "page-type/ios-component",
} as const satisfies RelationProperty

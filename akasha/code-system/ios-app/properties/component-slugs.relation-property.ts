import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type ComponentSlugs = List<Slug>

export const componentSlugs = {
  id: "01a05821-5723-7bc2-86dc-1b02cd1edded",
  pageTypeSlug: "relation-property",
  slug: "component-slugs",
  propertySlug: "component-slugs",
  definition: "the components an app's widget extension compiles",
  targetPageTypeSlug: "page-type/ios-component",
} as const satisfies RelationProperty

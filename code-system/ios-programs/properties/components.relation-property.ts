import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Components = List<Slug>

export const components = {
  id: "01a05821-5723-7bc2-86dc-1b02cd1edded",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "components",
  propertySlug: "components",
  definition: "the components a program compiles",
  targetPageType: "page-type/ios-component",
} as const satisfies RelationProperty

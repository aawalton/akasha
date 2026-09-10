import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

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

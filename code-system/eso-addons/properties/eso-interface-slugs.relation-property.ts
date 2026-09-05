import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type EsoInterfaceSlugs = List<Slug>

export const esoInterfaceSlugs = {
  id: "01a06036-9b78-7e16-a4d4-1b73c48a5c05",
  pageTypeSlug: "relation-property",
  slug: "eso-interface-slugs",
  propertySlug: "interface-slugs",
  definition: "the XML documents an addon loads",
  targetPageTypeSlug: "page-type/eso-interface",
} as const satisfies RelationProperty

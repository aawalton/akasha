import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PersonasCraftedSlugs = List<Slug>

export const personasCraftedSlugs = {
  id: "01a0655b-4a9b-7004-9d62-a9d0909a21ea",
  pageTypeSlug: "relation-property",
  slug: "personas-crafted-slugs",
  propertySlug: "personas-crafted-slugs",
  definition: "the personas made or improved on a day",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty

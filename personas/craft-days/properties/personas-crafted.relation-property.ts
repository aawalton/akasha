import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type PersonasCrafted = List<Slug>

export const personasCrafted = {
  id: "01a0655b-4a9b-7004-9d62-a9d0909a21ea",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "personas-crafted",
  propertySlug: "personas-crafted",
  definition: "the personas made or improved on a day",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty

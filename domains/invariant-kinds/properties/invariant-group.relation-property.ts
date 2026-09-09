import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type InvariantGroup = Slug

export const invariantGroup = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "invariant-group",
  propertySlug: "invariant-group",
  definition: "a slug naming an invariant group",
  targetPageType: "page-type/invariant-group",
} as const satisfies RelationProperty

import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const invariantGroup = {
  id: "01a04e11-9f98-7cf1-ac25-c66b4eea07c5",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "invariant-group",
  propertySlug: "invariant-group",
  definition: "a slug naming an invariant group",
  targetPageType: "page-type/invariant-group",
  types: "ts",
} as const satisfies RelationProperty

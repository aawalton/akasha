import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const sessionPersona = {
  id: "01a06d67-5303-706a-b90c-da8a8764a769",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "session-persona",
  propertySlug: "persona",
  definition: "the persona who made a review pass",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty

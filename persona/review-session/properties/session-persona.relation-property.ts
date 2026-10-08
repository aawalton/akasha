import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const sessionPersona = {
  id: "01a06d67-5303-706a-b90c-da8a8764a769",
  type: "page-type/relation-property",
  slug: "session-persona",
  propertySlug: "persona",
  definition: "the persona who made a review pass",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T17:11:23.139Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty

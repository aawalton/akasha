import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const experimentPersona = {
  id: "01a06d59-446e-771a-b415-e770351c25c9",
  type: "page-type/relation-property",
  slug: "experiment-persona",
  propertySlug: "persona",
  definition: "the persona who read an experiment",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T16:56:01.902Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty

import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const experimentPersona = {
  id: "01a06d59-446e-771a-b415-e770351c25c9",
  type: "page-type/relation-property",
  slug: "experiment-persona",
  propertySlug: "persona",
  definition: "the persona that watches an appearance experiment",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-04T16:56:01.902Z",
  updatedAt: "2026-10-30T16:30:40.923Z",
} as const satisfies RelationProperty

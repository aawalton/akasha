import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const messagedPersona = {
  id: "01a082db-817c-7626-b074-d75a367de571",
  type: "page-type/relation-property",
  slug: "messaged-persona",
  propertySlug: "persona",
  definition: "the persona Alan writes to",
  targetPageType: "page-type/persona",
  types: "ts",
  createdAt: "2026-09-08T21:10:18.748Z",
  updatedAt: "2026-10-30T16:43:57.278Z",
} as const satisfies RelationProperty

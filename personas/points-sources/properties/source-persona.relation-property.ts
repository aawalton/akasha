import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const sourcePersona = {
  id: "01a06d68-851d-7f22-97a3-73cc26de43fd",
  type: "relation-property",
  slug: "source-persona",
  propertySlug: "persona",
  definition: "the persona whose points a source is counted into",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty

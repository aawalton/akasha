import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const toDoValue = {
  id: "01a065a1-49b7-77b4-83e1-b4ae26009cdd",
  type: "relation-property",
  slug: "to-do-value",
  propertySlug: "to-do-value",
  definition: "the value doing this serves",
  targetPageType: "page-type/value",
  types: "ts",
} as const satisfies RelationProperty

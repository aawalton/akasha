import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const requestedAction = {
  id: "01a0542c-d18d-723c-8b98-1841c0eeef14",
  type: "relation-property",
  slug: "requested-action",
  propertySlug: "action",
  definition: "what a seat's supervisor has been asked to do",
  targetPageType: "page-type/supervisor-action",
  types: "ts",
} as const satisfies RelationProperty

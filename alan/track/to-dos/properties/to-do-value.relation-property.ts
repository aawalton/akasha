import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ToDoValue = Slug

export const toDoValue = {
  id: "01a065a1-49b7-77b4-83e1-b4ae26009cdd",
  pageTypeSlug: "relation-property",
  slug: "to-do-value",
  propertySlug: "to-do-value",
  definition: "the value doing this serves",
  targetPageType: "page-type/value",
} as const satisfies RelationProperty

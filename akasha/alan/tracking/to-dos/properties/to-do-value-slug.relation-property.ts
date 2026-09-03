import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ToDoValueSlug = Slug

export const toDoValueSlug = {
  id: "01a065a1-49b7-77b4-83e1-b4ae26009cdd",
  pageTypeSlug: "relation-property",
  slug: "to-do-value-slug",
  propertySlug: "to-do-value-slug",
  definition: "the value doing this serves",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty

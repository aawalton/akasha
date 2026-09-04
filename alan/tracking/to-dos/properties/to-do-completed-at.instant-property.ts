import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ToDoCompletedAt = string

export const toDoCompletedAt = {
  id: "01a065a1-49b7-760b-9898-a50285cf1a69",
  pageTypeSlug: "instant-property",
  slug: "to-do-completed-at",
  propertySlug: "to-do-completed-at",
  definition: "when this round of a to-do was finished",
} as const satisfies InstantProperty

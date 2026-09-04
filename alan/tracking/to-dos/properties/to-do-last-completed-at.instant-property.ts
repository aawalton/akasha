import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ToDoLastCompletedAt = string

export const toDoLastCompletedAt = {
  id: "01a065a1-49b7-777b-b48c-bb63a1971368",
  pageTypeSlug: "instant-property",
  slug: "to-do-last-completed-at",
  propertySlug: "to-do-last-completed-at",
  definition: "when a to-do was last finished",
} as const satisfies InstantProperty

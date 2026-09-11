import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const toDoCompletedAt = {
  id: "01a065a1-49b7-760b-9898-a50285cf1a69",
  type: "instant-property",
  slug: "to-do-completed-at",
  propertySlug: "to-do-completed-at",
  definition: "when this round of a to-do was finished",
  types: "ts",
} as const satisfies InstantProperty

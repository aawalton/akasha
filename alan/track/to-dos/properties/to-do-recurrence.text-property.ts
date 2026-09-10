import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ToDoRecurrence = string

export const toDoRecurrence = {
  id: "01a065a1-49b7-74c2-9642-632b4fbf0c65",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "to-do-recurrence",
  propertySlug: "to-do-recurrence",
  definition: "the rule saying when a to-do comes round again",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty

import type { RruleProperty } from "akasha/page/rrule-property/rrule-property.page-type.types.ts"

export const toDoRecurrence = {
  id: "01a065a1-49b7-74c2-9642-632b4fbf0c65",
  type: "page-type/rrule-property",
  slug: "to-do-recurrence",
  propertySlug: "to-do-recurrence",
  definition: "the rule saying when a to-do comes round again",
  types: "ts",
} as const satisfies RruleProperty

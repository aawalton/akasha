import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type CompletedTasks = "jsonl"

export const completedTasks = {
  id: "01a05fd8-c30f-72c4-9102-9b3dbc179f51",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "completed-tasks",
  propertySlug: "completed-tasks",
  definition: "every round of a to-do finished on a day, one to a line",
  properties: [
    { pageProperty: "number-property/seq", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "instant-property/completed-at", required: true, many: false },
    { pageProperty: "calendar-date-property/due-date", required: false, many: false },
    { pageProperty: "text-property/value-slug", required: false, many: false },
    { pageProperty: "text-property/recurrence", required: false, many: false },
    { pageProperty: "text-property/category", required: false, many: false },
    { pageProperty: "text-property/to-do-slug", required: false, many: false },
    { pageProperty: "text-property/priority", required: false, many: false },
    { pageProperty: "boolean-property/anchored-from-completion", required: false, many: false },
    { pageProperty: "text-property/description", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry

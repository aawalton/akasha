import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type CompletedTasks = "jsonl"

export const completedTasks = {
  id: "01a05fd8-c30f-72c4-9102-9b3dbc179f51",
  pageTypeSlug: "page-property-entry",
  slug: "completed-tasks",
  propertySlug: "completed-tasks",
  definition: "every round of a to-do finished on a day, one to a line",
  properties: [
    { pagePropertySlug: "number-property/seq", required: true, many: false },
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "instant-property/completed-at", required: true, many: false },
    { pagePropertySlug: "text-property/due-date", required: false, many: false },
    { pagePropertySlug: "text-property/value-slug", required: false, many: false },
    { pagePropertySlug: "text-property/recurrence", required: false, many: false },
    { pagePropertySlug: "text-property/category", required: false, many: false },
    { pagePropertySlug: "text-property/to-do-slug", required: false, many: false },
    { pagePropertySlug: "text-property/priority", required: false, many: false },
    { pagePropertySlug: "boolean-property/anchored-from-completion", required: false, many: false },
    { pagePropertySlug: "text-property/description", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry

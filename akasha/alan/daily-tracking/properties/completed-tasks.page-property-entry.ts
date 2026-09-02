import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type CompletedTasks = "jsonl"

export const completedTasks = {
  id: "01a05fd8-c30f-72c4-9102-9b3dbc179f51",
  pageTypeSlug: "page-property-entry",
  slug: "completed-tasks",
  propertySlug: "completed-tasks",
  definition: "every round of a to-do finished on a day, one to a line",
  properties: [
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "completed-at", required: true, many: false },
    { pagePropertySlug: "due-date", required: false, many: false },
    { pagePropertySlug: "value-slug", required: false, many: false },
    { pagePropertySlug: "recurrence", required: false, many: false },
    { pagePropertySlug: "category", required: false, many: false },
    { pagePropertySlug: "to-do-slug", required: false, many: false },
    { pagePropertySlug: "priority", required: false, many: false },
    { pagePropertySlug: "anchored-from-completion", required: false, many: false },
    { pagePropertySlug: "description", required: false, many: false },
  ],
} as const satisfies PagePropertyEntry

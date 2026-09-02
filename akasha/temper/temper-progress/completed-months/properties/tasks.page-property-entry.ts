import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Tasks = "jsonl"

export const tasks = {
  id: "01a05fd3-4360-7cbd-9645-540c39cd97e3",
  pageTypeSlug: "page-property-entry",
  slug: "tasks",
  propertySlug: "tasks",
  definition: "the tasks marked done in a month, one completion to a line",
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "completed-at", required: true, many: false },
    { pagePropertySlug: "scope", required: true, many: false },
    { pagePropertySlug: "task", required: false, many: false },
    { pagePropertySlug: "character", required: false, many: false },
    { pagePropertySlug: "eso-character-id", required: false, many: false },
    { pagePropertySlug: "priority", required: false, many: false },
    { pagePropertySlug: "due-date", required: false, many: false },
    { pagePropertySlug: "rrule-rule", required: false, many: false },
    { pagePropertySlug: "rrule-anchor-from-completion", required: false, many: false },
    { pagePropertySlug: "completion-card-id", required: false, many: false },
    { pagePropertySlug: "completion-item-path", required: false, many: true, max: null },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
    { pagePropertySlug: "link", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is what a task was when the task was marked done.",
    },
    {
      invariantKind: "departure",
      statement: "A later edit to the task leaves the line as the line was written.",
    },
    {
      invariantKind: "departure",
      statement: "A line outlives the task the line was written from.",
    },
  ],
} as const satisfies PagePropertyEntry

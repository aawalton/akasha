import type { Readout } from "../../readout.page-type.ts"

export const inboxesTasks = {
  id: "01a06230-b156-7d81-a78b-ca66f6f5da77",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "inboxes-tasks",
  definition: "how many of Alan's tasks are waiting",
  code: "ts",
  test: "ts",
  label: "Tasks",
  unit: "tasks",
  place: 2,
  scale: "daily-inbox",
  earnedKey: "inbox-tasks-cleared-today",
  groups: ["inboxes"],
  wireKey: "tasks",
  querySlug: "inbox-readings-on-day",
  queryKey: "inbox-tasks",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The count is the count the tracking day has for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The count is how many tasks are undone at the end of that day.",
    },

    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A tracking day with no count is no reading rather than a count of zero.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
} as const satisfies Readout

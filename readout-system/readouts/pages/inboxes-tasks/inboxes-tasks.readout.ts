import type { Readout } from "../../readout.page-type.ts"

export const inboxesTasks = {
  id: "01a06230-b156-7d81-a78b-ca66f6f5da77",
  pageTypeSlug: "readout",
  slug: "inboxes-tasks",
  definition: "how many of Alan's tasks are waiting",
  code: "ts",
  test: "ts",
  label: "Tasks",
  unit: "tasks",
  place: 2,
  figureFormat: "integer",
  scaleSlug: "daily-inbox",
  earnedKey: "inbox-tasks-cleared-today",
  groupSlugs: ["inboxes"],
  wireKey: "tasks",
  querySlug: "inbox-readings-on-day",
  queryKey: "inbox-tasks",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The count is the one the tracking day carries for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The count is how many tasks are undone at the end of that day.",
    },
    {
      invariantKind: "departure",
      statement: "A count stated as text is read as the number that count spells.",
    },
    {
      invariantKind: "departure",
      statement: "A count of zero is a count.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A tracking day carrying no count is no reading rather than a count of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
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

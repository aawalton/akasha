import type { Readout } from "../../../../readout-system/readouts/readout.page-type.ts"

export const inboxesTemperTasks = {
  id: "01a0603b-d45a-7ff5-8a9e-03ecb545e854",
  pageTypeSlug: "readout",
  slug: "inboxes-temper-tasks",
  definition: "how many game tasks are waiting",
  code: "ts",
  test: "ts",
  label: "Temper tasks",
  unit: "tasks",
  place: 3,
  figureFormat: "integer",
  scaleSlug: "daily-inbox",
  earnedKey: "inbox-temper-tasks-cleared-today",
  groupSlugs: ["inboxes"],
  wireKey: "temperTasks",
  querySlug: "inbox-readings-on-day",
  queryKey: "inbox-temper-tasks",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The count is the one the tracking day carries.",
    },
    {
      invariantKind: "departure",
      statement: "The count is how many game tasks are undone at the end of that day.",
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
      statement: "Nothing here caches a reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
} as const satisfies Readout

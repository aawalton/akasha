import type { Readout } from "akasha/alan/harness/readouts/readout.page-type.types.ts"

export const inboxesTasks = {
  id: "01a06230-b156-7d81-a78b-ca66f6f5da77",
  type: "readout",
  slug: "inboxes-tasks",
  definition: "how many of Alan's tasks are waiting",
  reading: {},
  label: "Tasks",
  unit: "tasks",
  place: 2,
  scale: "readout-scale/daily-inbox",
  earnedKey: "inbox-tasks-cleared-today",
  groups: ["readout-group/inboxes"],
  wireKey: "tasks",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count is the count the tracking day has for the day asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count is how many tasks are undone at the end of that day.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tracking day with no count is no reading rather than a count of zero.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
} as const satisfies Readout

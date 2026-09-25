import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const inboxesTasks = {
  id: "01a06230-b156-7d81-a78b-ca66f6f5da77",
  type: "page-type/readout",
  slug: "inboxes-tasks",
  definition: "how many of Alan's tasks are waiting",
  label: "Tasks",
  unit: "tasks",
  place: 2,
  scale: "readout-scale/daily-inbox",
  groups: ["readout-group/inboxes"],
  wireKey: "tasks",
  servedBy: ["module/inbox-reading", "service-workstation/inbox-relay-service"],
  countedOn: "eso-day",
  countedFrom: "number-property/inbox-tasks",
  countName: "task count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is the count the tracking day has for the day asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is how many tasks are undone at the end of that day.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "No tracking day is no reading rather than a count of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracking day with no count is no reading rather than a count of zero.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a count into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web"],
  madeFrom: "day-row",
} as const satisfies Readout

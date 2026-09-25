import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const upkeepSleep = {
  id: "01a06220-ef8c-700d-ad60-4cf3f17ae1e3",
  type: "page-type/readout",
  slug: "upkeep-sleep",
  definition: "how long Alan slept last night",
  reading: {},
  label: "Sleep",
  unit: "hours",
  place: 6,
  scale: "readout-scale/sleep-hours",
  groups: ["readout-group/upkeep"],
  wireKey: "sleep",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the reading the tracking day has for the day asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sleep a day has is the total of that day's own sleep stretches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sleep given as text is taken as the number that text spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No tracking day is no reading rather than a sleep of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracking day with no sleep is no reading rather than a sleep of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no sleep stretch has no sleep rather than a sleep of zero.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a sleep into a color.",
    },
  ],
  carriedTo: ["router-app/alan-web", "router-app/smilingjenny-web"],
} as const satisfies Readout

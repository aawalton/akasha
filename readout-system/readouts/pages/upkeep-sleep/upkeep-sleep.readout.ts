import type { Readout } from "../../readout.page-type.ts"

export const upkeepSleep = {
  id: "01a06220-ef8c-700d-ad60-4cf3f17ae1e3",
  pageTypeSlug: "readout",
  slug: "upkeep-sleep",
  definition: "how long Alan slept last night",
  code: "ts",
  test: "ts",
  label: "Sleep",
  unit: "hours",
  place: 6,
  figureFormat: "decimal",
  scaleSlug: "sleep-hours",
  groupSlugs: ["upkeep"],
  wireKey: "sleep",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the one the tracking day carries for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The sleep a day carries is the total of that day's own sleep stretches.",
    },
    {
      invariantKind: "departure",
      statement: "A sleep given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a sleep of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A tracking day carrying no sleep is no reading rather than a sleep of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day holding no sleep stretch carries no sleep rather than a sleep of zero.",
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
      statement: "Nothing here turns a sleep into a color.",
    },
  ],
} as const satisfies Readout

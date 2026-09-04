import type { Readout } from "../../readout.page-type.ts"

export const upkeepActivity = {
  id: "01a06222-9827-768e-aecd-7f7161a45e92",
  pageTypeSlug: "readout",
  slug: "upkeep-activity",
  definition: "how much Alan has moved today",
  code: "ts",
  test: "ts",
  label: "Activity",
  unit: "calories",
  place: 5,
  figureFormat: "integer",
  scaleSlug: "activity-calories",
  wireKey: "activity",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the one the tracking day carries for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The activity a day carries is the day's cardio and the day's lifting together.",
    },
    {
      invariantKind: "departure",
      statement: "A day's cardio is the calories the day's health readings were rolled up into.",
    },
    {
      invariantKind: "departure",
      statement: "A day's lifting is seven pounds moved to the calorie.",
    },
    {
      invariantKind: "departure",
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying one half alone is a reading of that half.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than an activity of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day carrying neither half is no reading rather than an activity of zero.",
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
      statement: "Nothing here reads a health sample.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns an activity into a color.",
    },
  ],
} as const satisfies Readout

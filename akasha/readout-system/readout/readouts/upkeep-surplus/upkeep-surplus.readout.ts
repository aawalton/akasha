import type { Readout } from "../../readout.page-type.ts"

export const upkeepSurplus = {
  id: "01a05fc3-145a-78a6-902f-ea39b8165c39",
  pageTypeSlug: "readout",
  slug: "upkeep-surplus",
  definition: "how much of Alan's night the day has left him",
  code: "ts",
  test: "ts",
  label: "Surplus",
  unit: "hours",
  place: 2,
  figureFormat: "decimal",
  scaleSlug: "surplus-hours",
  groupSlugs: ["upkeep", "surplus"],
  wireKey: "surplus",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the one the tracking day carries for the day asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus a day carries is the day's sleep less the day's spend.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus below zero is a reading.",
    },
    {
      invariantKind: "departure",
      statement: "A surplus given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "No tracking day is no reading rather than a surplus of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A tracking day carrying no surplus is no reading rather than a surplus of zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day holding neither sleep nor spend is no reading rather than a surplus of zero.",
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
      statement: "Nothing here turns a surplus into a color.",
    },
  ],
} as const satisfies Readout

import type { Readout } from "../../readout.page-type.ts"

export const upkeepCapacity = {
  id: "01a06230-614a-7c46-9fba-3be28e181ca4",
  pageTypeSlug: "readout",
  slug: "upkeep-capacity",
  definition: "how much stress capacity Alan has in hand",
  code: "ts",
  test: "ts",
  label: "Capacity",
  unit: "hours",
  place: 3,
  figureFormat: "decimal",
  scaleSlug: "capacity-hours",
  groupSlugs: ["upkeep"],
  wireKey: "capacity",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is what every stretch of the day adds up to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The capacity a stretch carries is the hours the stretch ran times the capacity an hour was worth.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch gives capacity back or takes capacity away.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity below zero is a reading.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch carrying no capacity is left out of the sum.",
    },
    {
      invariantKind: "departure",
      statement: "No stretch on the day is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day whose every stretch carries no capacity is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read as holding two hundred stretches at the most.",
    },
    {
      invariantKind: "departure",
      statement: "That bound is the one the reach taking the reading carries.",
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
      statement: "Nothing here turns a capacity into a color.",
    },
  ],
} as const satisfies Readout

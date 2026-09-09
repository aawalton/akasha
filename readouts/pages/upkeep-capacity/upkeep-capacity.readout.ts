import type { Readout } from "../../readout.page-type.ts"

export const upkeepCapacity = {
  id: "01a06230-614a-7c46-9fba-3be28e181ca4",
  pageTypeSlug: "readout",
  type: "readout",
  slug: "upkeep-capacity",
  definition: "how much stress capacity Alan has in hand",
  code: "ts",
  test: "ts",
  label: "Capacity",
  unit: "hours",
  place: 3,
  scale: "capacity-hours",
  groups: ["upkeep"],
  wireKey: "capacity",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the sum of the day's stretches that have ended.",
    },
    {
      invariantKind: "departure",
      statement:
        "The capacity a stretch has is the hours the stretch ran times the capacity an hour was worth.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch gives capacity back or takes capacity away.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch still running has no capacity rather than the hours run so far.",
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
      statement: "A stretch with no capacity is left out of the sum.",
    },
    {
      invariantKind: "departure",
      statement: "No stretch on the day is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day whose every stretch has no capacity is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read as holding two hundred stretches at the most.",
    },
    {
      invariantKind: "departure",
      statement: "That bound is the bound the reach taking the reading carries.",
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

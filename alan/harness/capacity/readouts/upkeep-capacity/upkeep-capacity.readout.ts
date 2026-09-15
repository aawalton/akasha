import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const upkeepCapacity = {
  id: "01a06230-614a-7c46-9fba-3be28e181ca4",
  type: "page-type/readout",
  slug: "upkeep-capacity",
  definition: "how much stress capacity Alan has in hand",
  reading: {},
  label: "Capacity",
  unit: "hours",
  place: 3,
  scale: "readout-scale/capacity-hours",
  groups: ["readout-group/upkeep"],
  wireKey: "capacity",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the sum of the day's stretches that have ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The capacity a stretch has is the hours the stretch ran times the capacity an hour was worth.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch gives capacity back or takes capacity away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch still running has no capacity rather than the hours run so far.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capacity below zero is a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capacity given as text is read as the number that text spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch with no capacity is left out of the sum.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No stretch on the day is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A day whose every stretch has no capacity is no reading rather than a capacity of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is read as holding two hundred stretches at the most.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That bound is the bound the reach taking the reading carries.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a capacity into a color.",
    },
  ],
} as const satisfies Readout

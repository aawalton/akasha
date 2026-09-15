import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const upkeepSurplus = {
  id: "01a05fc3-145a-78a6-902f-ea39b8165c39",
  type: "readout",
  slug: "upkeep-surplus",
  definition: "how much of Alan's night the day has left him",
  reading: {},
  label: "Surplus",
  unit: "hours",
  place: 2,
  scale: "readout-scale/surplus-hours",
  groups: ["readout-group/upkeep", "readout-group/surplus"],
  wireKey: "surplus",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the reading the tracking day has for the day asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The surplus a day has is the day's sleep less the day's spend.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus below zero is a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus given as text is read as the number that text spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No tracking day is no reading rather than a surplus of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tracking day with no surplus is no reading rather than a surplus of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with neither sleep nor spend is no reading rather than a surplus of zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A surplus falls with the clock while a stretch of the day is still running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How fast it falls is the sum of what an hour of each running stretch costs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A running stretch whose hour costs nothing has the surplus fall at nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cost of an hour is read from the one module the day's spend reads it from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch with no end is the stretch running now.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns a surplus into a color.",
    },
  ],
} as const satisfies Readout

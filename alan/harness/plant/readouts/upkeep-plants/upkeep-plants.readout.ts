import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const upkeepPlants = {
  id: "01a06221-d65f-79f1-86c6-ac9568df5717",
  type: "page-type/readout",
  slug: "upkeep-plants",
  definition: "how many grams of whole plants Alan has eaten in a day",
  reading: {},
  label: "Plants",
  unit: "grams",
  place: 4,
  scale: "readout-scale/plant-grams",
  wireKey: "plants",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the plant grams of every food entry inside the day's window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The window the entries are counted over is handed in rather than worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Grams given as text are read as the number that text spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A food entry with no plant grams adds nothing to the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A food entry whose grams spell no number adds nothing to the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no food entry is a reading of zero rather than no reading.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns grams into a color.",
    },
  ],
} as const satisfies Readout

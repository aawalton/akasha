import type { Readout } from "../../readout.page-type.ts"

export const upkeepPlants = {
  id: "01a06221-d65f-79f1-86c6-ac9568df5717",
  pageTypeSlug: "readout",
  slug: "upkeep-plants",
  definition: "how many grams of whole plants Alan has eaten in a day",
  code: "ts",
  test: "ts",
  label: "Plants",
  unit: "grams",
  place: 4,
  figureFormat: "integer",
  scaleSlug: "plant-grams",
  wireKey: "plants",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the plant grams of every food entry inside the day's window.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window the entries are counted over is handed in rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "Grams given as text are read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A food entry carrying no plant grams adds nothing to the total.",
    },
    {
      invariantKind: "departure",
      statement: "A food entry whose grams spell no number adds nothing to the total.",
    },
    {
      invariantKind: "departure",
      statement: "A day holding no food entry is a reading of zero rather than no reading.",
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
      statement: "Nothing here turns grams into a color.",
    },
  ],
} as const satisfies Readout

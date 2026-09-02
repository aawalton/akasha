import type { Readout } from "../../readout.page-type.ts"

export const fun = {
  id: "01a06297-07b2-78a5-877b-cf5b655cbbc6",
  pageTypeSlug: "readout",
  slug: "fun",
  definition: "the green day units Alan's personas came to for fun on a day",
  code: "ts",
  label: "Fun",
  unit: "green day units",
  place: 5,
  figureFormat: "decimal",
  scaleSlug: "green-day-units",
  groupSlugs: ["values"],
  wireKey: "fun",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading totals the rungs the day's persona days reached for this value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona day counts at the rung the day reached rather than at the day's own units.",
    },
    {
      invariantKind: "departure",
      statement: "No persona day for the day asked for is no reading rather than a total of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A rung given as text is read as the number that rung spells.",
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
      statement: "Nothing here turns a total into a color.",
    },
  ],
} as const satisfies Readout

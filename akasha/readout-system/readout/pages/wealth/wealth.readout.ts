import type { Readout } from "../../readout.page-type.ts"

export const wealth = {
  id: "01a06297-07b2-7b3c-b466-d9878fa8bf00",
  pageTypeSlug: "readout",
  slug: "wealth",
  definition: "the green day units Alan's personas came to for wealth on a day",
  code: "ts",
  label: "Wealth",
  unit: "green day units",
  place: 6,
  figureFormat: "decimal",
  scaleSlug: "green-day-units",
  groupSlugs: ["values"],
  wireKey: "wealth",
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

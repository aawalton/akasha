import type { Readout } from "../../readout.page-type.ts"

export const attributeCharisma = {
  id: "01a06838-950f-7f4c-9f40-60cc35fa63f5",
  pageTypeSlug: "readout",
  slug: "attribute-charisma",
  definition: "the points Alan earned on a day for the hours he was more safe than challenged",
  code: "ts",
  label: "Charisma",
  unit: "points",
  place: 6,
  figureFormat: "decimal",
  scaleSlug: "attribute-points",
  groupSlugs: ["attributes"],
  wireKey: "charisma",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the hours of the day's stretches Alan was at ease over.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is at ease where its safety less its difficulty is one or more.",
    },
    {
      invariantKind: "departure",
      statement: "An hour at ease is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A level given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch missing either level or either time is left out of the sum.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch that is not at ease adds no hours and still makes the day a reading.",
    },
    {
      invariantKind: "departure",
      statement: "A day no stretch can be read on is no reading rather than a charisma of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read as holding two hundred stretches at the most.",
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
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout

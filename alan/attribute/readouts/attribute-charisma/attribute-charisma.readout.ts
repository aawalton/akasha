import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeCharisma = {
  id: "01a06838-950f-7f4c-9f40-60cc35fa63f5",
  type: "readout",
  slug: "attribute-charisma",
  definition: "the points Alan earned on a day for the hours with someone that cost him nothing",
  label: "CHA",
  unit: "points",
  place: 6,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/charisma",
  groups: ["readout-group/attributes"],
  wireKey: "charisma",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the points the charisma attribute has for today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The attribute is reached through the link this readout names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute with no points today is no reading rather than a zero.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out the points a day earned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout

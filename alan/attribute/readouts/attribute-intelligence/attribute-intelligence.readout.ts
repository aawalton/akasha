import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeIntelligence = {
  id: "01a06838-94d9-7c36-b921-4351c8db6033",
  type: "readout",
  slug: "attribute-intelligence",
  definition: "the points Alan earned on a day for the learn-everything topics he updated",
  label: "INT",
  unit: "points",
  place: 5,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/intelligence",
  groups: ["readout-group/attributes"],
  wireKey: "intelligence",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the points the intelligence attribute has for today.",
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

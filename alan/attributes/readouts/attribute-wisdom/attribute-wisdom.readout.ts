import type { Readout } from "akasha/alan/harness/readouts/readout.page-type.types.ts"

export const attributeWisdom = {
  id: "01a06838-94ae-75cc-850c-98f366cb8269",
  type: "readout",
  slug: "attribute-wisdom",
  definition: "the points Alan earned on a day for the words he added about himself",
  label: "WIS",
  unit: "points",
  place: 4,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/wisdom",
  groups: ["readout-group/attributes"],
  wireKey: "wisdom",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is the points the wisdom attribute has for today.",
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

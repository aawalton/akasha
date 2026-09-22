import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeWisdom = {
  id: "01a06838-94ae-75cc-850c-98f366cb8269",
  type: "page-type/readout",
  slug: "attribute-wisdom",
  definition: "the points Alan earned on a day for the words he added about himself",
  label: "WIS",
  unit: "points",
  place: 4,
  scale: "readout-scale/wisdom-points",
  attribute: "attribute/wisdom",
  groups: ["readout-group/attributes"],
  wireKey: "wisdom",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the wisdom attribute has for today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The attribute is reached through the link this readout names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute with no points today is no reading rather than a zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out the points a day earned.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns points into a color.",
    },
  ],
} as const satisfies Readout

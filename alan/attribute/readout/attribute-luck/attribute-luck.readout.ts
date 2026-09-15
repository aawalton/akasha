import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeLuck = {
  id: "01a0a6a4-999a-78a0-b884-c0e9a6de0787",
  type: "page-type/readout",
  slug: "attribute-luck",
  definition: "the points Alan earned on a day for the rejections he risked",
  label: "LUK",
  unit: "points",
  place: 7,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/luck",
  groups: ["readout-group/attributes"],
  wireKey: "luck",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the luck attribute has for today.",
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

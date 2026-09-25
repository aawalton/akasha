import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeEndurance = {
  id: "01a06838-945f-7ac6-b3a4-411fa111e195",
  type: "page-type/readout",
  slug: "attribute-endurance",
  definition: "the points Alan earned on a day for the calories he burned moving",
  label: "END",
  unit: "points",
  place: 2,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/endurance",
  groups: ["readout-group/attributes"],
  wireKey: "endurance",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the endurance attribute has for today.",
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
  carriedTo: ["router-app/alan-web"],
} as const satisfies Readout

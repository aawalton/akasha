import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeEndurance = {
  id: "01a06838-945f-7ac6-b3a4-411fa111e195",
  type: "page-type/readout",
  slug: "attribute-endurance",
  definition: "the points Alan earned on a day for the calories he burned moving",
  label: "END",
  unit: "points",
  scale: "readout-scale/attribute-points",
  attribute: "attribute/endurance",
  groups: [
    { group: "readout-group/attributes", place: 2 },
    { group: "readout-group/resources", place: 4, label: "Activity" },
  ],
  wireKey: "endurance",
  servedBy: ["module/attributes-reading", "service-workstation/attributes-relay-service"],
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
  madeFrom: "day-row",
  createdAt: "2026-09-03T17:02:13.599Z",
  updatedAt: "2026-10-18T13:32:41.384Z",
} as const satisfies Readout

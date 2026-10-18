import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeIntelligence = {
  id: "01a06838-94d9-7c36-b921-4351c8db6033",
  type: "page-type/readout",
  slug: "attribute-intelligence",
  definition: "the points Alan earned on a day for the learn-everything topics he updated",
  label: "INT",
  unit: "points",
  scale: "readout-scale/attribute-points",
  attribute: "attribute/intelligence",
  groups: [{ group: "readout-group/attributes", place: 5 }],
  wireKey: "intelligence",
  servedBy: ["module/attributes-reading", "service-workstation/attributes-relay-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the intelligence attribute has for today.",
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
  createdAt: "2026-09-03T17:02:13.721Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout

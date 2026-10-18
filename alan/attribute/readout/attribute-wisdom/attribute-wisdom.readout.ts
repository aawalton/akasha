import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeWisdom = {
  id: "01a06838-94ae-75cc-850c-98f366cb8269",
  type: "page-type/readout",
  slug: "attribute-wisdom",
  definition: "the points Alan earned on a day for the words he added about himself",
  label: "WIS",
  unit: "points",
  scale: "readout-scale/wisdom-points",
  attribute: "attribute/wisdom",
  groups: [{ group: "readout-group/attributes", place: 4 }],
  wireKey: "wisdom",
  servedBy: ["module/attributes-reading", "service-workstation/attributes-relay-service"],
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
  carriedTo: ["router-app/alan-web"],
  madeFrom: "day-row",
  createdAt: "2026-09-03T17:02:13.678Z",
  updatedAt: "2026-10-18T13:28:15.838Z",
} as const satisfies Readout

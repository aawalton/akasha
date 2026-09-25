import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeStrength = {
  id: "01a06838-9421-7f89-932a-569d681c18a4",
  type: "page-type/readout",
  slug: "attribute-strength",
  definition: "the points Alan earned on a day for the weight he moved",
  label: "STR",
  unit: "points",
  place: 1,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/strength",
  groups: ["readout-group/attributes"],
  wireKey: "strength",
  servedBy: ["module/attributes-reading", "service-workstation/attributes-relay-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the strength attribute has for today.",
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
} as const satisfies Readout

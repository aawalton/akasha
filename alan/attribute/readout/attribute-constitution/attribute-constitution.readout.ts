import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const attributeConstitution = {
  id: "01a06838-9486-7039-a5b5-f3b864bb2160",
  type: "page-type/readout",
  slug: "attribute-constitution",
  definition: "the points Alan earned on a day for the whole plants he ate",
  label: "CON",
  unit: "points",
  place: 3,
  scale: "readout-scale/attribute-points",
  attribute: "attribute/constitution",
  groups: ["readout-group/attributes"],
  wireKey: "constitution",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the points the constitution attribute has for today.",
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
  madeFrom: "day-row-and-food-entries",
} as const satisfies Readout

import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const attributeScores = {
  id: "01a0c634-be95-7a9e-b319-f4550a71ad2a",
  type: "page-type/record-property",
  slug: "attribute-scores",
  propertySlug: "attributes",
  definition: "what an entity has in each attribute its game names",
  properties: [
    { pageProperty: "relation-property/scored-attribute", required: true, many: false },
    { pageProperty: "number-property/attribute-score", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A score names the attribute page rather than a word off the sheet.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No entity scores an attribute its game does not name.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

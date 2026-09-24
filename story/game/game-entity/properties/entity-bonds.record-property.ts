import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityBonds = {
  id: "01a0c63c-7c7c-71fc-82a7-90cbaf43aa20",
  type: "page-type/record-property",
  slug: "entity-bonds",
  propertySlug: "bonds",
  definition: "who an entity is tied to, and what the tie couples on each side",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "relation-property/bound-entity", required: true, many: false },
    { pageProperty: "text-property/bond-direction", required: true, many: false },
    { pageProperty: "relation-property/bond-attribute", required: false, many: false },
    { pageProperty: "relation-property/bound-attribute", required: false, many: false },
    { pageProperty: "boolean-property/bond-grows", required: false, many: false },
    { pageProperty: "number-property/established-turn", required: false, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
    { pageProperty: "text-property/listed-source", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond is written on each of the two it holds rather than once between them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bond names the attribute it couples on each side.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

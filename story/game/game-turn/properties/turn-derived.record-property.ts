import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const turnDerived = {
  id: "01a0c69f-b3f2-755e-a4ad-bdd88364044c",
  type: "page-type/record-property",
  slug: "turn-derived",
  propertySlug: "derived",
  definition: "the numbers a game's mechanics worked out for a turn, each under its own name",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "number-property/derived-number", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is the one the sheet shows the number by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn a number was worked out for keeps it, so no reader works it out again.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

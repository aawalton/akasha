import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const tabooSenses = {
  id: "01a0592f-d53e-7a82-b68e-38856ee374cf",
  type: "page-type/record-property",
  slug: "taboo-senses",
  propertySlug: "taboo-senses",
  definition: "the senses a taboo term is never written in, each with what is written instead",
  properties: [
    { pageProperty: "text-property/sense", required: true, many: false },
    { pageProperty: "text-property/instead", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every sense a term bars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A taboo sense bars one sense of the term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sense is alone among the senses one term bars.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

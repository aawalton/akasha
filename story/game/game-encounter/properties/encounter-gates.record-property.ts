import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const encounterGates = {
  id: "01a0c648-61be-7877-89a6-1452a1e9b7aa",
  type: "page-type/record-property",
  slug: "encounter-gates",
  propertySlug: "gates",
  definition: "what an encounter does to a strike, by how the one striking read it",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "number-property/gate-multiplier", required: true, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gate is the number the mechanic settling a strike is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter naming no gate lets every strike through whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading an encounter right is worth what its gates say and nothing more.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

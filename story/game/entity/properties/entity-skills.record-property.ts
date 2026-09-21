import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entitySkills = {
  id: "01a0c638-3b18-7156-b011-d466055dd675",
  type: "page-type/record-property",
  slug: "entity-skills",
  propertySlug: "skills",
  definition: "what an entity has learnt to do, and how far each one has come",
  properties: [
    { pageProperty: "text-property/sheet-name", required: true, many: false },
    { pageProperty: "number-property/skill-progress", required: true, many: false },
    { pageProperty: "text-property/sheet-effect", required: true, many: false },
    { pageProperty: "text-property/sheet-source", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill holds how far it has come rather than the rung that reaches.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A mechanic names the rung a skill's progress reaches.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

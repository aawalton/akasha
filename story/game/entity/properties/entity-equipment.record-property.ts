import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityEquipment = {
  id: "01a0c63a-77a8-7aa8-ae8c-141b34ac194b",
  type: "page-type/record-property",
  slug: "entity-equipment",
  propertySlug: "equipment",
  definition: "what an entity wears, holds and carries, and what each of them is worth",
  properties: [
    { pageProperty: "text-property/sheet-name", required: true, many: false },
    { pageProperty: "text-property/equipment-slot", required: false, many: false },
    { pageProperty: "number-property/equipment-attack", required: false, many: false },
    { pageProperty: "number-property/equipment-defense", required: false, many: false },
    { pageProperty: "relation-property/scaled-by", required: false, many: false },
    { pageProperty: "text-property/sheet-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What an entity wears and what an entity carries are one list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of the two a thing is is read off the slot that thing fills.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

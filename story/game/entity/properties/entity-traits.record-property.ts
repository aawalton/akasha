import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityTraits = {
  id: "01a0c637-533c-7d20-91d2-bcd683e32b4e",
  type: "page-type/record-property",
  slug: "entity-traits",
  propertySlug: "traits",
  definition: "what is true of an entity that no number on its sheet says",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "text-property/listed-effect", required: true, many: false },
    { pageProperty: "text-property/listed-source", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is what an entity is rather than what an entity has learnt.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty

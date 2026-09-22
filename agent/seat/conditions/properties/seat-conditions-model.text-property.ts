import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const seatConditionsModel = {
  id: "01a0687a-3d99-79f8-990a-c6349cc5ffba",
  type: "page-type/text-property",
  slug: "seat-conditions-model",
  propertySlug: "model",
  definition: "the model of a seat's agent",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent naming no model of its own answers on this model too.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty

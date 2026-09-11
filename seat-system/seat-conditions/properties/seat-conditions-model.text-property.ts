import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const seatConditionsModel = {
  id: "01a0687a-3d99-79f8-990a-c6349cc5ffba",
  type: "text-property",
  slug: "seat-conditions-model",
  propertySlug: "model",
  definition: "the model a seat's agent answers on",
  maxLength: 40,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent naming no model of its own answers on this model too.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty

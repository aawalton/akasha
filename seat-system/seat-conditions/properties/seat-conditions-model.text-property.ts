import type { TextProperty } from "@akasha/pages/text-property"

export type SeatConditionsModel = string

export const seatConditionsModel = {
  id: "01a0687a-3d99-79f8-990a-c6349cc5ffba",
  pageTypeSlug: "text-property",
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
} as const satisfies TextProperty

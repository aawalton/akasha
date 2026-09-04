import type { TextProperty } from "@akasha/pages-system/text-property"

export type SeatConditionsModel = string

export const seatConditionsModel = {
  id: "01a0687a-3d99-79f8-990a-c6349cc5ffba",
  pageTypeSlug: "text-property",
  slug: "seat-conditions-model",
  propertySlug: "model",
  definition: "the model a seat's agent answers on",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent naming no model of its own answers on this too.",
    },
  ],
} as const satisfies TextProperty

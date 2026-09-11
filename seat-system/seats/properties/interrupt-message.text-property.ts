import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const interruptMessage = {
  id: "01a0542c-d18d-7082-98e2-c660a96a4136",
  type: "text-property",
  slug: "interrupt-message",
  propertySlug: "message",
  definition: "what a seat is told when a request interrupts it",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

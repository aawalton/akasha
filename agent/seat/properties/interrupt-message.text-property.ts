import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const interruptMessage = {
  id: "01a0542c-d18d-7082-98e2-c660a96a4136",
  type: "page-type/text-property",
  slug: "interrupt-message",
  propertySlug: "message",
  definition: "the message sent to a seat's agent when its supervisor starts the agent",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

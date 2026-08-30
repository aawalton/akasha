import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type InterruptMessage = string

export const interruptMessage = {
  id: "01a0542c-d18d-7082-98e2-c660a96a4136",
  pageTypeSlug: "text-property",
  slug: "interrupt-message",
  propertySlug: "message",
  definition: "what a seat is told when a request interrupts it",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty

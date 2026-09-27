import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const appointmentPlace = {
  id: "01a0e3b2-a003-7e9e-a476-b8b19f0383c4",
  type: "page-type/text-property",
  slug: "appointment-place",
  propertySlug: "appointment-place",
  definition: "where an appointment is to be kept",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

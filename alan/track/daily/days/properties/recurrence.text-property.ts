import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Recurrence = string

export const recurrence = {
  id: "01a05fd8-c30f-7a76-bb8d-0bd2cc0aec04",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "recurrence",
  propertySlug: "recurrence",
  definition: "the rule bringing a to-do round again",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

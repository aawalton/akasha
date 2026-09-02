import type { TextProperty } from "@akasha/pages-system/text-property"

export type Recurrence = string

export const recurrence = {
  id: "01a05fd8-c30f-7a76-bb8d-0bd2cc0aec04",
  pageTypeSlug: "text-property",
  slug: "recurrence",
  propertySlug: "recurrence",
  definition: "the rule bringing a to-do round again",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

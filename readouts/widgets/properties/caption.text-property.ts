import type { TextProperty } from "@akasha/pages/text-property"

export type Caption = string

export const caption = {
  id: "01a06420-b259-7fba-81e2-d1fe54b7a587",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "caption",
  propertySlug: "caption",
  definition: "the words a widget draws beside its reading",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

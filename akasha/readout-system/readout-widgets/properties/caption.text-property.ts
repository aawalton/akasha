import type { TextProperty } from "@akasha/pages-system/text-property"

export type Caption = string

export const caption = {
  id: "01a06420-b259-7fba-81e2-d1fe54b7a587",
  pageTypeSlug: "text-property",
  slug: "caption",
  propertySlug: "caption",
  definition: "the words a widget draws beside its reading",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

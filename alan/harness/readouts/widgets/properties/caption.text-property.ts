import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const caption = {
  id: "01a06420-b259-7fba-81e2-d1fe54b7a587",
  type: "text-property",
  slug: "caption",
  propertySlug: "caption",
  definition: "the words a widget draws beside its reading",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

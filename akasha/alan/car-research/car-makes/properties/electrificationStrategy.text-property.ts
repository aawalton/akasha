import type { TextProperty } from "@akasha/pages-system/text-property"

export type ElectrificationStrategy = string

export const electrificationStrategy = {
  id: "01a06598-aa80-7941-8553-0df76fbad5b5",
  pageTypeSlug: "text-property",
  slug: "electrificationStrategy",
  propertySlug: "electrificationStrategy",
  definition: "what the make has said it will build and by when",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty

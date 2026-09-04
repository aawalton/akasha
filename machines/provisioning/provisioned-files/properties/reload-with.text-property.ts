import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReloadWith = string

export const reloadWith = {
  id: "01a06861-49aa-76f2-affd-b68bc4f6045a",
  pageTypeSlug: "text-property",
  slug: "reload-with",
  propertySlug: "reload-with",
  definition: "what is run after the body is placed so the placing takes effect",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

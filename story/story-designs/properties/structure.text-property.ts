import type { TextProperty } from "@akasha/pages-system/text-property"

export type Structure = string

export const structure = {
  id: "01a06577-f385-74b8-a41f-28866d09f90a",
  pageTypeSlug: "text-property",
  slug: "structure",
  propertySlug: "structure",
  definition: "how a story's parts are arranged",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty

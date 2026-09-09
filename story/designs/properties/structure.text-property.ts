import type { TextProperty } from "@akasha/pages/text-property"

export type Structure = string

export const structure = {
  id: "01a06577-f385-74b8-a41f-28866d09f90a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "structure",
  propertySlug: "structure",
  definition: "how a story's parts are arranged",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty

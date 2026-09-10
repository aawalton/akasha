import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MotifId = string

export const motifId = {
  id: "01a06582-bd62-7e31-83b4-f252d4b9e91c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "motif-id",
  propertySlug: "motif-id",
  definition: "the Lichess theme a motif is named by",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

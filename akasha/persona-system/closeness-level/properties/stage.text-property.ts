import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Stage = string

export const stage = {
  id: "01a0540e-5113-7d93-8661-ff144392c5d4",
  pageTypeSlug: "text-property",
  slug: "stage",
  propertySlug: "stage",
  definition: "the phase of closeness a rung belongs to",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

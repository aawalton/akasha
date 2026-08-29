import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type Warrant = string

export const warrant = {
  id: "01a049c9-3a2c-73fb-98e4-6576fd3968b4",
  pageTypeSlug: "text-property",
  slug: "warrant",
  definition: "the general fact an act follows from",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type Aid = string

export const aid = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  pageTypeSlug: "text-property",
  slug: "aid",
  definition: "a ruling on one act a reader is about to take, for or against",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty

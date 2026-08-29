import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type Aid = string

export type Aids = List<Aid>

export const aids = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  pageTypeSlug: "text-property",
  slug: "aids",
  definition: "the rulings on acts a reader is about to take, each for or against",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty

import type { PagePropertyType } from "../page/page-property-type.page-type.ts"

export type Aid = string

export const aid = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  slug: "aid",
  definition: "a ruling on one act a reader is about to take, for or against",
  extendsSlug: null,
  nameFormatSlug: null,
  max: 50,
} as const satisfies PagePropertyType

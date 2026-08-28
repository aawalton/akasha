import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Name = string

export const name = {
  id: "01a049e7-9b73-7000-af6e-b06a64bcd1c1",
  slug: "name",
  definition: "what a directive is called",
  extendsSlug: null,
  nameFormatSlug: null,
  max: 30,
} as const satisfies PagePropertyType

import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Act = string

export const act = {
  id: "01a049c9-3a2c-7234-9286-d41a1bc4a7c0",
  pageTypeSlug: "text-property",
  slug: "act",
  definition: "what a directive tells its reader to do",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty

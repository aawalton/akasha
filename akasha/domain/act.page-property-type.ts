import type { PagePropertyType } from "../page/page-property-type.page-type.ts"

export type Act = string

export const act = {
  id: "01a049c9-3a2c-7234-9286-d41a1bc4a7c0",
  slug: "act",
  definition: "what a directive tells its reader to do",
  extendsSlug: null,
  nameFormatSlug: null,
  max: 100,
} as const satisfies PagePropertyType

import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Rules = readonly Directive[]

export const rules = {
  id: "01a049c9-3a2c-78fd-beff-2bdcf7275be9",
  slug: "rules",
  definition: "the standing instructions a domain leaves only to be obeyed",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType

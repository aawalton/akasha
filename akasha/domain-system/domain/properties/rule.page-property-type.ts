import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Rule = readonly Directive[]

export const rule = {
  id: "01a049c9-3a2c-78fd-beff-2bdcf7275be9",
  slug: "rule",
  definition: "a standing instruction, leaving only whether it was done",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType

import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"
import type { List } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Rule = List<Directive>

export const rule = {
  id: "01a049c9-3a2c-78fd-beff-2bdcf7275be9",
  pageTypeSlug: "page-property-type",
  slug: "rule",
  definition: "an instruction that always applies, leaving only whether it was done",
  extendsSlug: null,
  kind: "list",
  entrySlug: "directive",
  max: null,
} as const satisfies PagePropertyType

import type {
  List,
  PagePropertyType,
} from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Rules = List<Directive>

export const rules = {
  id: "01a049c9-3a2c-78fd-beff-2bdcf7275be9",
  pageTypeSlug: "page-property-type",
  slug: "rules",
  definition: "an instruction that always applies, leaving only whether it was done",
  extendsSlug: null,
  kind: "list",
  entrySlug: "directive",
  max: null,
} as const satisfies PagePropertyType

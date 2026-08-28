import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Directive } from "./directive.page-property-type.ts"

export type Principle = readonly Directive[]

export const principle = {
  id: "01a049c9-3a2c-7fb1-b669-33a23413d326",
  slug: "principle",
  definition: "a truth packed tight so it reaches many cases",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType

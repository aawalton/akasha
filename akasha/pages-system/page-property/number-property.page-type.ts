import type { Max } from "../page-property-type/properties/max.page-property-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { PageProperty } from "./page-property.page-type.ts"

export type NumberProperty = PageProperty & {
  max: Max | null
}

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  pageTypeSlug: "page-type",
  slug: "number-property",
  definition: "a page property holding a number",
  extendsSlug: "page-type/page-property",
  properties: [{ propertySlug: "page-property-type/max", required: true, many: false }],
} as const satisfies PageType

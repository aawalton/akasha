import type { PageType } from "../page-type/page-type.page-type.ts"
import type { PageProperty } from "./page-property.page-type.ts"
import type { Max } from "./properties/max.number-property.ts"

export type NumberProperty = PageProperty & {
  max: Max | null
}

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  pageTypeSlug: "page-type",
  slug: "number-property",
  definition: "a page property holding a number",
  extendsSlug: "page-type/page-property",
  properties: [{ propertySlug: "max", required: true, many: false }],
} as const satisfies PageType

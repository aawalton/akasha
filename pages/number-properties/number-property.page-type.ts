import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Max } from "../types/page-properties/properties/max.number-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type NumberProperty = PageProperty & {
  max: Max
}

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "number-property",
  definition: "a page property with a number",
  pluralSlug: "number-properties",
  extends: ["page-type/page-property"],
  parts: ["number-property/max"],
  properties: [{ pageProperty: "number-property/max", required: true, many: false }],
} as const satisfies PageType

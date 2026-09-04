import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { Max } from "../types/page-properties/properties/max.number-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type NumberProperty = PageProperty & {
  max: Max | null
}

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  pageTypeSlug: "page-type",
  slug: "number-property",
  definition: "a page property holding a number",
  pluralSlug: "number-properties",
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "max", required: true, many: false }],
} as const satisfies PageType

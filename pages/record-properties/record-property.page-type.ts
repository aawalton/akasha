import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { Properties } from "../types/properties/properties.record-property.ts"

export type RecordProperty = PageProperty & {
  properties: Properties
}

export const recordProperty = {
  id: "01a04dff-9d7d-7801-928a-feeaaaa1c8f0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "record-property",
  definition: "a page property holding named fields",
  pluralSlug: "record-properties",
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "record-property/properties", required: true, many: true, maxCount: null },
  ],
} as const satisfies PageType

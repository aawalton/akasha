import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { Properties } from "../page-type/properties/properties.record-property.ts"

export type RecordProperty = PageProperty & {
  properties: Properties
}

export const recordProperty = {
  id: "01a04dff-9d7d-7801-928a-feeaaaa1c8f0",
  pageTypeSlug: "page-type",
  slug: "record-property",
  definition: "a page property holding named fields",
  extendsSlug: "page-type/page-property",
  properties: [{ pagePropertySlug: "properties", required: true, many: true, max: null }],
} as const satisfies PageType

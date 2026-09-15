import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { Properties } from "akasha/page/type/properties/properties.one-of-property.types.ts"

export type RecordProperty = PageProperty & {
  properties: Properties
}

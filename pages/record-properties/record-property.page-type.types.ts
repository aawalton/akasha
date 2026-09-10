import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Properties } from "../types/properties/properties.record-property.ts"

export type RecordProperty = PageProperty & {
  properties: Properties
}

import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"
import type { Properties } from "akasha/pages/types/properties/properties.record-property.ts"

export type PagePropertyEntry = PageProperty & {
  properties: Properties
}

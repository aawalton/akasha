import type { EntryWrittenBy } from "akasha/page/property-entry/properties/entry-written-by.relation-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { Properties } from "akasha/page/type/properties/properties.one-of-property.types.ts"

export type PagePropertyEntry = PageProperty & {
  properties: Properties
  writtenBy?: EntryWrittenBy
}

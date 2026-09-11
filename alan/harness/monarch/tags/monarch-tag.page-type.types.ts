import type { MonarchRecord } from "akasha/alan/harness/monarch/records/monarch-record.page-type.types.ts"
import type { TagColour } from "akasha/alan/harness/monarch/tags/properties/tag-colour.text-property.types.ts"
import type { TagPlace } from "akasha/alan/harness/monarch/tags/properties/tag-place.number-property.types.ts"

export type MonarchTag = MonarchRecord & {
  tagColour: TagColour
  tagPlace: TagPlace
}

import type { MonarchRecord } from "akasha/alan/harness/monarch/record/monarch-record.page-type.types.ts"
import type { TagColor } from "akasha/alan/harness/monarch/tag/properties/tag-color.text-property.types.ts"
import type { TagPlace } from "akasha/alan/harness/monarch/tag/properties/tag-place.number-property.types.ts"

export type MonarchTag = MonarchRecord & {
  tagColor: TagColor
  tagPlace: TagPlace
}

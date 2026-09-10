import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { TagColour } from "./properties/tag-colour.text-property.ts"
import type { TagPlace } from "./properties/tag-place.number-property.ts"

export type MonarchTag = MonarchRecord & {
  tagColour: TagColour
  tagPlace: TagPlace
}

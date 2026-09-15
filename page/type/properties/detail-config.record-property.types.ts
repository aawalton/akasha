import type { BodyPropertyId } from "akasha/page/type/properties/body-property-id.text-property.types.ts"
import type { ChildCollection } from "akasha/page/type/properties/child-collection.record-property.types.ts"
import type { CollectionHeader } from "akasha/page/type/properties/collection-header.record-property.types.ts"
import type { DetailFrame } from "akasha/page/type/properties/detail-frame.record-property.types.ts"
import type { FullBleed } from "akasha/page/type/properties/full-bleed.boolean-property.types.ts"
import type { LengthPropertyId } from "akasha/page/type/properties/length-property-id.text-property.types.ts"
import type { MarkReadOnEnd } from "akasha/page/type/properties/mark-read-on-end.boolean-property.types.ts"
import type { ProgressPropertyId } from "akasha/page/type/properties/progress-property-id.text-property.types.ts"
import type { ShowReadingProgress } from "akasha/page/type/properties/show-reading-progress.boolean-property.types.ts"

export type DetailConfig = {
  frame?: DetailFrame
  bodyPropertyId?: BodyPropertyId
  fullBleed?: FullBleed
  showReadingProgress?: ShowReadingProgress
  markReadOnEnd?: MarkReadOnEnd
  progressPropertyId?: ProgressPropertyId
  lengthPropertyId?: LengthPropertyId
  header?: CollectionHeader
  childCollection?: ChildCollection
}

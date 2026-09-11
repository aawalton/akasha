import type { BodyPropertyId } from "akasha/pages/types/properties/body-property-id.text-property.types.ts"
import type { ChildCollection } from "akasha/pages/types/properties/child-collection.record-property.types.ts"
import type { CollectionHeader } from "akasha/pages/types/properties/collection-header.record-property.types.ts"
import type { DetailDisplay } from "akasha/pages/types/properties/detail-display.text-property.types.ts"
import type { DetailFrame } from "akasha/pages/types/properties/detail-frame.record-property.types.ts"
import type { FullBleed } from "akasha/pages/types/properties/full-bleed.boolean-property.types.ts"
import type { LengthPropertyId } from "akasha/pages/types/properties/length-property-id.text-property.types.ts"
import type { MarkReadOnEnd } from "akasha/pages/types/properties/mark-read-on-end.boolean-property.types.ts"
import type { ProgressPropertyId } from "akasha/pages/types/properties/progress-property-id.text-property.types.ts"
import type { ShowReadingProgress } from "akasha/pages/types/properties/show-reading-progress.boolean-property.types.ts"

export type DetailConfig = {
  display?: DetailDisplay
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

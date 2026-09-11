import type { MediaRenderer } from "akasha/pages/types/properties/media-renderer.text-property.types.ts"
import type { MediaSourcePropertyId } from "akasha/pages/types/properties/media-source-property-id.text-property.types.ts"
import type { MediaVariantAxis } from "akasha/pages/types/properties/media-variant-axis.text-property.types.ts"

export type AudioMedia = {
  sourcePropertyId: MediaSourcePropertyId
  renderer: MediaRenderer
  variantAxis?: MediaVariantAxis
}

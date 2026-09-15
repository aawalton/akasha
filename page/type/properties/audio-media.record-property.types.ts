import type { MediaRenderer } from "akasha/page/type/properties/media-renderer.text-property.types.ts"
import type { MediaSourcePropertyId } from "akasha/page/type/properties/media-source-property-id.text-property.types.ts"
import type { MediaVariantAxis } from "akasha/page/type/properties/media-variant-axis.text-property.types.ts"

export type AudioMedia = {
  sourcePropertyId: MediaSourcePropertyId
  renderer: MediaRenderer
  variantAxis?: MediaVariantAxis
}

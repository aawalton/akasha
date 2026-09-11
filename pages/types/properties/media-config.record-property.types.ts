import type { AudioMedia } from "akasha/pages/types/properties/audio-media.record-property.types.ts"
import type { ImageMedia } from "akasha/pages/types/properties/image-media.record-property.types.ts"

export type MediaConfig = {
  audio?: AudioMedia
  image?: ImageMedia
}

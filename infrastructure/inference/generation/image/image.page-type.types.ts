import type { ImageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Image = Page & {
  bytes?: ImageBytes
}

import type { Domain } from "../../../../domains/domain.page-type.types.ts"
import type { ImageExtensions } from "./properties/image-extensions.file-property.ts"
import type { ImageFolder } from "./properties/image-folder.text-property.ts"
import type { ImageKind } from "./properties/image-kind.text-property.ts"

export type BuiltImage = Domain & {
  kind: ImageKind
  folder: ImageFolder
  extensions?: ImageExtensions
}

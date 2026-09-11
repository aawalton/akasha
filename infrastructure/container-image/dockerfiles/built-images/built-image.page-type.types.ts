import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Extending } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/extending.module-property-group.ts"
import type { ImageExtensions } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-extensions.file-property.ts"
import type { ImageFolder } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-folder.text-property.types.ts"
import type { ImageKind } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-kind.select-property.ts"
import type { ImageRepository } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-repository.text-property.types.ts"

export type BuiltImage = Domain & {
  kind: ImageKind
  folder: ImageFolder
  extensions?: ImageExtensions
  repository?: ImageRepository
  extending?: Extending
}

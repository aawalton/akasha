import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Extending } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/extending.module-property-group.ts"
import type { ImageDockerfile } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/image-dockerfile.file-property.types.ts"
import type { ImageExtensions } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/image-extensions.file-property.types.ts"
import type { ImageFolder } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/image-folder.text-property.types.ts"
import type { ImageKind } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/image-kind.select-property.types.ts"
import type { ImageRepository } from "akasha/infrastructure/container-image/dockerfile/built-image/properties/image-repository.text-property.types.ts"

export type BuiltImage = Domain & {
  kind: ImageKind
  folder: ImageFolder
  dockerfile: ImageDockerfile
  extensions?: ImageExtensions
  repository?: ImageRepository
  extending?: Extending
}

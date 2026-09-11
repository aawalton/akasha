import type { imageExtensions } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-extensions.file-property.ts"

export type ImageExtensions = (typeof imageExtensions.extensions)[number]

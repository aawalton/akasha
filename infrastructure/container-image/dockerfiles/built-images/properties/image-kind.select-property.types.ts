import type { imageKind } from "akasha/infrastructure/container-image/dockerfiles/built-images/properties/image-kind.select-property.ts"

export type ImageKind = (typeof imageKind.values)[number]

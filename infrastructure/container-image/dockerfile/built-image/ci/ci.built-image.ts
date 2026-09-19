import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfile/built-image/built-image.page-type.types.ts"

export const ci = {
  id: "01a08195-0e78-7ea5-b0ec-f8b6ae4155c6",
  type: "page-type/built-image",
  slug: "ci",
  definition: "the image a pipeline's own steps run in",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfile",
  extensions: "json",
  repository: "cluster/ci",
} as const satisfies BuiltImage

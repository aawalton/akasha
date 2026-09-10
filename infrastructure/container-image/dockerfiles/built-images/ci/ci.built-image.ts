import type { BuiltImage } from "../built-image.page-type.ts"

export const ci = {
  id: "01a08195-0e78-7ea5-b0ec-f8b6ae4155c6",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "ci",
  definition: "the image a pipeline's own steps run in",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfiles",
  extensions: "json",
} as const satisfies BuiltImage

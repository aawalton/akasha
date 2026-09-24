import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfile/built-image/built-image.page-type.types.ts"

export const bunGit = {
  id: "01a08195-9aac-7e4b-b655-f432049e6a48",
  type: "page-type/built-image",
  slug: "bun-git",
  definition: "the image with bun beside git",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfile",
  dockerfile: "dockerfile",
  extensions: "json",
} as const satisfies BuiltImage

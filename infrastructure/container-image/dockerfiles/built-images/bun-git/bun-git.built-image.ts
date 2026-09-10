import type { BuiltImage } from "../built-image.page-type.ts"

export const bunGit = {
  id: "01a08195-9aac-7e4b-b655-f432049e6a48",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "bun-git",
  definition: "the image with bun beside git",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfiles",
  extensions: "json",
} as const satisfies BuiltImage

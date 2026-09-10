import type { BuiltImage } from "../built-image.page-type.types.ts"

export const buildkit = {
  id: "01a08196-17bb-728a-95ac-3294061e39dc",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "buildkit",
  definition: "the image container images are built by",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfiles",
  extensions: "json",
} as const satisfies BuiltImage

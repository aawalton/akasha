import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfile/built-image/built-image.page-type.types.ts"

export const buildkit = {
  id: "01a08196-17bb-728a-95ac-3294061e39dc",
  type: "page-type/built-image",
  slug: "buildkit",
  definition: "the image building container images",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfile",
  extensions: "json",
} as const satisfies BuiltImage

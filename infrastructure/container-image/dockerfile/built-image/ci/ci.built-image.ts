import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfile/built-image/built-image.page-type.types.ts"

export const ci = {
  id: "01a08195-0e78-7ea5-b0ec-f8b6ae4155c6",
  type: "page-type/built-image",
  slug: "ci",
  definition: "the image running a pipeline's own steps",
  kind: "tool-image",
  folder: "infrastructure/container-image/dockerfile",
  dockerfile: "dockerfile",
  extensions: "json",
  repository: "cluster/ci",
  createdAt: "2026-09-08T15:13:44.568Z",
  updatedAt: "2026-09-24T22:19:44.000Z",
} as const satisfies BuiltImage

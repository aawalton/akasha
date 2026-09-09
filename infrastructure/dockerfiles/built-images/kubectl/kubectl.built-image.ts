import type { BuiltImage } from "../built-image.page-type.ts"

export const kubectl = {
  id: "01a08196-9015-7321-b20c-98d923881057",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "kubectl",
  definition: "the image with kubectl",
  kind: "tool-image",
  folder: "infrastructure/dockerfiles",
  extensions: "json",
} as const satisfies BuiltImage

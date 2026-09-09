import type { BuiltImage } from "../built-image.page-type.ts"

export const authProxy = {
  id: "01a08194-1a6e-744f-aa2e-fdb20aea0fe1",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "auth-proxy",
  definition: "the image the authenticating proxy runs in",
  kind: "bun-service",
  folder: "infrastructure/auth-proxy",
} as const satisfies BuiltImage

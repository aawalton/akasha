import type { BuiltImage } from "akasha/infrastructure/container-image/dockerfile/built-image/built-image.page-type.types.ts"

export const authProxy = {
  id: "01a08194-1a6e-744f-aa2e-fdb20aea0fe1",
  type: "page-type/built-image",
  slug: "auth-proxy",
  definition: "the authenticating proxy's image",
  kind: "bun-service",
  folder: "infrastructure/network/auth-proxy",
  dockerfile: "dockerfile",
  extensions: "json",
  repository: "infra/auth-proxy",
} as const satisfies BuiltImage

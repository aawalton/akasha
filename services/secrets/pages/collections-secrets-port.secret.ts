import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsPort = {
  id: "01a076b6-cc30-7f50-a192-1a2a0a2dd04e",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-port",
  placements: [{ resourceName: "collections-secrets", resourceKey: "PORT" }],
} as const satisfies Secret

import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsRoyalroadPassword = {
  id: "01a076b7-5b5c-72ca-ae08-6482d4978d62",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-royalroad-password",
  placements: [{ resourceName: "collections-secrets", resourceKey: "ROYALROAD_PASSWORD" }],
} as const satisfies Secret

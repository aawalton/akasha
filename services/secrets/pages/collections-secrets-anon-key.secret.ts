import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsAnonKey = {
  id: "01a07697-d07d-7c5d-aa96-48c5303250d9",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-anon-key",
  placements: [{ resourceName: "collections-secrets", resourceKey: "ANON_KEY" }],
} as const satisfies Secret

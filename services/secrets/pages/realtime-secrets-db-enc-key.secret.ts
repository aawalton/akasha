import type { Secret } from "../secret.page-type.ts"

export const realtimeSecretsDbEncKey = {
  id: "01a07699-6219-7063-a25d-8050d0f6f272",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "realtime-secrets-db-enc-key",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "DB_ENC_KEY" }],
} as const satisfies Secret

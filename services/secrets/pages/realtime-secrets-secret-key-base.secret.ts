import type { Secret } from "../secret.page-type.types.ts"

export const realtimeSecretsSecretKeyBase = {
  id: "01a07699-bf5d-7bed-b050-0703e319d6c1",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "realtime-secrets-secret-key-base",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "SECRET_KEY_BASE" }],
} as const satisfies Secret

import type { Secret } from "../secret.page-type.ts"

export const realtimeSecretsDatabaseUrl = {
  id: "01a07699-44e5-72b2-b43e-d748516645bf",
  pageTypeSlug: "secret",
  slug: "realtime-secrets-database-url",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "DATABASE_URL" }],
} as const satisfies Secret

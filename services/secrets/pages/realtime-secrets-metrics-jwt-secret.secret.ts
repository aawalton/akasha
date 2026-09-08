import type { Secret } from "../secret.page-type.ts"

export const realtimeSecretsMetricsJwtSecret = {
  id: "01a07699-dde0-7222-a8c2-61b2342cc09d",
  pageTypeSlug: "secret",
  slug: "realtime-secrets-metrics-jwt-secret",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "METRICS_JWT_SECRET" }],
} as const satisfies Secret

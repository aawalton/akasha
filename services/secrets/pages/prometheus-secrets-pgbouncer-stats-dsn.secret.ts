import type { Secret } from "../secret.page-type.types.ts"

export const prometheusSecretsPgbouncerStatsDsn = {
  id: "01a07698-5ad5-75dd-8ad6-61c0372a4e3b",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "prometheus-secrets-pgbouncer-stats-dsn",
  placements: [{ resourceName: "prometheus-secrets", resourceKey: "PGBOUNCER_STATS_DSN" }],
} as const satisfies Secret

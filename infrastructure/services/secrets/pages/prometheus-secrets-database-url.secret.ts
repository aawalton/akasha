import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const prometheusSecretsDatabaseUrl = {
  id: "01a07698-3a07-7f5e-be97-8edd8233e05d",
  type: "secret",
  slug: "prometheus-secrets-database-url",
  placements: [{ resourceName: "prometheus-secrets", resourceKey: "DATABASE_URL" }],
} as const satisfies Secret

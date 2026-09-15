import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const temperSecretsPostgrestDbUrl = {
  id: "01a076d8-38c1-7d4a-9513-73fc32d8e38e",
  type: "page-type/secret",
  slug: "temper-secrets-postgrest-db-url",
  placements: [{ resourceName: "temper-secrets", resourceKey: "POSTGREST_DB_URL" }],
} as const satisfies Secret

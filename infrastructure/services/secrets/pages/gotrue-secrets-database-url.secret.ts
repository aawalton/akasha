import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const gotrueSecretsDatabaseUrl = {
  id: "01a06832-cf2d-79d5-b7ce-25b4cd7ba81a",
  type: "secret",
  slug: "gotrue-secrets-database-url",
  placements: [{ resourceName: "gotrue-secrets", resourceKey: "DATABASE_URL" }],
} as const satisfies Secret

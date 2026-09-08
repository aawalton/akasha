import type { Secret } from "../secret.page-type.ts"

export const postgrestSecretsDatabaseUrl = {
  id: "01a07697-4dbb-79a9-b57b-0ed4d0a488cd",
  pageTypeSlug: "secret",
  slug: "postgrest-secrets-database-url",
  placements: [{ resourceName: "postgrest-secrets", resourceKey: "DATABASE_URL" }],
} as const satisfies Secret

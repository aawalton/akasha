import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsPostgrestDbUrl = {
  id: "01a076b7-47e0-7c5e-b785-a3d9bdd0aabf",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-postgrest-db-url",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "POSTGREST_DB_URL" },
    { resourceName: "alanwalton-secrets", resourceKey: "POSTGREST_DB_URL" },
  ],
} as const satisfies Secret

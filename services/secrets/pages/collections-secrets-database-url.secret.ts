import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsDatabaseUrl = {
  id: "01a07697-e59e-7dd5-8261-24e05620416d",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-database-url",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "DATABASE_URL" },
    { resourceName: "collections-secrets", resourceKey: "ZERO_UPSTREAM_DB" },
    { resourceName: "alanwalton-secrets", resourceKey: "DATABASE_URL" },
    { resourceName: "temper-secrets", resourceKey: "DATABASE_URL" },
    { resourceName: "temper-secrets", resourceKey: "ZERO_UPSTREAM_DB" },
  ],
} as const satisfies Secret

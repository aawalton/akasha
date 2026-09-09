import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsPostgresPassword = {
  id: "01a076b7-34fc-77d6-a963-edebe3a2e1c1",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-postgres-password",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "POSTGRES_PASSWORD" },
    { resourceName: "alanwalton-secrets", resourceKey: "POSTGRES_PASSWORD" },
    { resourceName: "temper-secrets", resourceKey: "POSTGRES_PASSWORD" },
  ],
} as const satisfies Secret

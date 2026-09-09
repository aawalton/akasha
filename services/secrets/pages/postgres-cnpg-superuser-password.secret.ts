import type { Secret } from "../secret.page-type.ts"

export const postgresCnpgSuperuserPassword = {
  id: "01a0769a-6254-759e-9884-a843873f27e9",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "postgres-cnpg-superuser-password",
  placements: [
    { resourceName: "postgres-cnpg-superuser", resourceKey: "password" },
    { resourceName: "postgres-secrets", resourceKey: "POSTGRES_PASSWORD" },
  ],
} as const satisfies Secret

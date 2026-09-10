import type { Secret } from "../secret.page-type.types.ts"

export const postgresCnpgSuperuserUsername = {
  id: "01a0769a-86d7-7e26-91ae-cdd6dc0fd508",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "postgres-cnpg-superuser-username",
  placements: [{ resourceName: "postgres-cnpg-superuser", resourceKey: "username" }],
} as const satisfies Secret

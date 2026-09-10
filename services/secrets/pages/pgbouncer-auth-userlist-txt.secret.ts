import type { Secret } from "../secret.page-type.types.ts"

export const pgbouncerAuthUserlistTxt = {
  id: "01a0768e-ed14-785e-8e43-b136fe71ae0c",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "pgbouncer-auth-userlist-txt",
  placements: [{ resourceName: "pgbouncer-auth", resourceKey: "userlist.txt" }],
} as const satisfies Secret

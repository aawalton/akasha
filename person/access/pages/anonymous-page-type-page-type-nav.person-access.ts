import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypePageTypeNav = {
  id: "01a0c52d-315f-72a6-b0d6-8292c605f595",
  type: "page-type/person-access",
  slug: "anonymous-page-type-page-type-nav",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "nav" },
  createdAt: "2026-09-21T18:14:28.447Z",
  updatedAt: "2026-09-21T18:32:15.000Z",
} as const satisfies PersonAccess

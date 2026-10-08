import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeWebPhrase = {
  id: "01a0e2cf-ad28-7194-9c31-7b7e3f2cfc71",
  type: "page-type/person-access",
  slug: "anonymous-page-type-web-phrase",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "web-phrase",
  deed: ["access-deed/read"],
  createdAt: "2026-09-27T12:20:56.232Z",
  updatedAt: "2026-09-27T12:21:16.000Z",
} as const satisfies PersonAccess

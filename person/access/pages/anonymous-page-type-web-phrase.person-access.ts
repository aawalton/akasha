import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeWebPhrase = {
  id: "01a0e2cf-ad28-7194-9c31-7b7e3f2cfc71",
  type: "page-type/person-access",
  slug: "anonymous-page-type-web-phrase",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "web-phrase",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

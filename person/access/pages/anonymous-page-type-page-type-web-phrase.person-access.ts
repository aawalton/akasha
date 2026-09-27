import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypePageTypeWebPhrase = {
  id: "01a0e2cf-ad28-76bc-aa0a-8c7c49e00cfe",
  type: "page-type/person-access",
  slug: "anonymous-page-type-page-type-web-phrase",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "web-phrase" },
} as const satisfies PersonAccess

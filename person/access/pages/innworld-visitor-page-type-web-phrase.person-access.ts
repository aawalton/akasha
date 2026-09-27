import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeWebPhrase = {
  id: "01a0e2cf-ad28-71a5-87e8-3e93520e4a17",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-web-phrase",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "web-phrase",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

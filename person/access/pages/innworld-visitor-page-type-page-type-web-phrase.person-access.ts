import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWebPhrase = {
  id: "01a0e2cf-ad28-787e-835d-26d01a9f7c6f",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-web-phrase",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "web-phrase" },
  createdAt: "2026-09-27T12:20:56.232Z",
  updatedAt: "2026-09-27T12:21:16.000Z",
} as const satisfies PersonAccess

import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldMiracle = {
  id: "01a0c5f7-d1cf-7aae-989d-28cbf781f434",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-miracle",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-miracle" },
} as const satisfies PersonAccess

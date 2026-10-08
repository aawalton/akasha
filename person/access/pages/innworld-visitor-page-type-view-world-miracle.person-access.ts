import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypeViewWorldMiracle = {
  id: "01a0c954-114f-7541-a0e5-63ffc323a264",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-view-world-miracle",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "pageType", is: "page-type/world-miracle" },
  createdAt: "2026-09-22T13:35:25.007Z",
  updatedAt: "2026-09-22T13:35:27.000Z",
} as const satisfies PersonAccess

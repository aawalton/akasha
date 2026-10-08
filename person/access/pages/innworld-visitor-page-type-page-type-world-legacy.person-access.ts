import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypeWorldLegacy = {
  id: "01a0c5f8-e148-7679-b004-86ac99c71e12",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-world-legacy",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "world-legacy" },
  createdAt: "2026-09-21T21:56:57.288Z",
  updatedAt: "2026-09-21T21:57:50.000Z",
} as const satisfies PersonAccess

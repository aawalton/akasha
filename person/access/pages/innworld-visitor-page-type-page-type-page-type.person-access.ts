import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const innworldVisitorPageTypePageTypePageType = {
  id: "01a0c656-a320-7386-893c-f20b5f3392ed",
  type: "page-type/person-access",
  slug: "innworld-visitor-page-type-page-type-page-type",
  person: "person/innworld-visitor",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "page-type" },
  createdAt: "2026-09-21T23:39:21.760Z",
  updatedAt: "2026-09-21T23:39:29.000Z",
} as const satisfies PersonAccess

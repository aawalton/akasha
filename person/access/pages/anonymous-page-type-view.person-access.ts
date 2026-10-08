import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeView = {
  id: "01a0c52d-315f-7f71-8ca4-5cec802058ef",
  type: "page-type/person-access",
  slug: "anonymous-page-type-view",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "view",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "requests-published" },
  createdAt: "2026-09-21T18:14:28.447Z",
  updatedAt: "2026-09-21T18:34:57.000Z",
} as const satisfies PersonAccess

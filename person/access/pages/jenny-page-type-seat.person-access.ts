import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypeSeat = {
  id: "01a16ee2-03d1-76c5-b3fd-9773ee0d6651",
  type: "page-type/person-access",
  slug: "jenny-page-type-seat",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "seat",
  deed: ["access-deed/read-some"],
  narrow: { key: "slug", is: "claudius" },
  createdAt: "2026-10-24T17:07:48.304Z",
  updatedAt: "2026-10-24T20:29:35.416Z",
} as const satisfies PersonAccess

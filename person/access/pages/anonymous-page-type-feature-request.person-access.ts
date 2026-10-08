import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const anonymousPageTypeFeatureRequest = {
  id: "01a0c52d-315f-7653-b891-7e7df0314b74",
  type: "page-type/person-access",
  slug: "anonymous-page-type-feature-request",
  person: "person/anonymous",
  accessKind: "access-kind/page-type",
  target: "feature-request",
  deed: ["access-deed/read-some"],
  narrow: { key: "standing", is: "published" },
  createdAt: "2026-09-21T18:14:28.447Z",
  updatedAt: "2026-09-21T18:31:36.000Z",
} as const satisfies PersonAccess

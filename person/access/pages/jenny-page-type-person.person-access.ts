import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypePerson = {
  id: "01a0c50e-621b-7277-a5f3-f03153b72eeb",
  type: "page-type/person-access",
  slug: "jenny-page-type-person",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "person",
  deed: ["access-deed/read"],
  createdAt: "2026-09-21T17:40:49.307Z",
  updatedAt: "2026-09-21T17:42:18.000Z",
} as const satisfies PersonAccess

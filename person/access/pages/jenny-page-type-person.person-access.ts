import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypePerson = {
  id: "01a0c50e-621b-7277-a5f3-f03153b72eeb",
  type: "page-type/person-access",
  slug: "jenny-page-type-person",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "person",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

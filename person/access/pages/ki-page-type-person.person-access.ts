import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypePerson = {
  id: "01a0c50f-43f1-7b36-bf5a-fb1dbd513543",
  type: "page-type/person-access",
  slug: "ki-page-type-person",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "person",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

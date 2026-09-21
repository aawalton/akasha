import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const jennyPageTypePageType = {
  id: "01a0c50e-dfb8-7f94-98ec-25a6e8d63f1f",
  type: "page-type/person-access",
  slug: "jenny-page-type-page-type",
  person: "person/jenny",
  accessKind: "access-kind/page-type",
  target: "page-type",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

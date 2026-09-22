import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiBook = {
  id: "01a05433-f103-7f79-9e4d-114269ff0b41",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-book",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-book",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/book",
} as const satisfies PersonAccess

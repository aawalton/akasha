import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiAuthor = {
  id: "01a05433-f103-7b4d-92d3-cbfa2bd44eee",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-author",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-author",
  deed: ["access-deed/read", "access-deed/write"],
  serves: "page-type/author",
} as const satisfies PersonAccess

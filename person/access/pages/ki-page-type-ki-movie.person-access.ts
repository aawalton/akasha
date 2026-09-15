import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const kiPageTypeKiMovie = {
  id: "01a05433-f104-769b-a1be-2612f5f674a0",
  type: "page-type/person-access",
  slug: "ki-page-type-ki-movie",
  person: "person/ki",
  accessKind: "access-kind/page-type",
  target: "ki-movie",
  serves: "movie",
} as const satisfies PersonAccess

import type { PersonAccess } from "../person-access.page-type.types.ts"

export const kiPageTypeKiMovie = {
  id: "01a05433-f104-769b-a1be-2612f5f674a0",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "ki-page-type-ki-movie",
  person: "ki",
  accessKind: "page-type",
  target: "ki-movie",
  serves: "movie",
} as const satisfies PersonAccess

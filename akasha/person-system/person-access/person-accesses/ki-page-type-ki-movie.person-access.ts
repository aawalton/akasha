import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiMovie = {
  id: "01a05433-f104-769b-a1be-2612f5f674a0",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-movie",
  personAccessPersonSlug: "ki",
  personAccessKind: "page-type",
  personAccessTarget: "ki-movie",
  personAccessServes: "movie",
} as const satisfies PersonAccess

import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiBookSeries = {
  id: "01a05433-f103-740e-8a49-dbe3f9a58d53",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-book-series",
  personAccessPersonSlug: "ki",
  personAccessKind: "page-type",
  personAccessTarget: "ki-book-series",
  personAccessServes: "book-series",
} as const satisfies PersonAccess

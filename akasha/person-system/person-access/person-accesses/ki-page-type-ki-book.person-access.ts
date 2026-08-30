import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiBook = {
  id: "01a05433-f103-7f79-9e4d-114269ff0b41",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-book",
  personAccessPersonSlug: "ki",
  personAccessKind: "page-type",
  personAccessTarget: "ki-book",
  personAccessServes: "book",
} as const satisfies PersonAccess

import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiAuthor = {
  id: "01a05433-f103-7b4d-92d3-cbfa2bd44eee",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-author",
  personAccessPersonSlug: "ki",
  personAccessKind: "page-type",
  personAccessTarget: "ki-author",
  personAccessServes: "author",
} as const satisfies PersonAccess

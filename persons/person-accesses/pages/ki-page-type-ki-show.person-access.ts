import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiShow = {
  id: "01a05433-f105-759f-a560-e569a07c586c",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-show",
  personSlug: "ki",
  accessKind: "page-type",
  target: "ki-show",
  serves: "show",
} as const satisfies PersonAccess

import type { PersonAccess } from "../person-access.page-type.types.ts"

export const kiPageTypeKiAuthor = {
  id: "01a05433-f103-7b4d-92d3-cbfa2bd44eee",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "ki-page-type-ki-author",
  person: "ki",
  accessKind: "page-type",
  target: "ki-author",
  serves: "author",
} as const satisfies PersonAccess

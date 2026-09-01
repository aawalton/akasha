import type { PersonAccess } from "../person-access.page-type.ts"

export const kiPageTypeKiFranchise = {
  id: "01a05433-f104-7bfb-b13d-3cf4c46cd143",
  pageTypeSlug: "person-access",
  slug: "ki-page-type-ki-franchise",
  personSlug: "ki",
  accessKind: "page-type",
  target: "ki-franchise",
  serves: "franchise",
} as const satisfies PersonAccess

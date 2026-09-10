import type { PersonAccess } from "../person-access.page-type.types.ts"

export const kiPageTypeKiSeason = {
  id: "01a05433-f105-761b-baed-d61da7f3de85",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "ki-page-type-ki-season",
  person: "ki",
  accessKind: "page-type",
  target: "ki-season",
  serves: "season",
} as const satisfies PersonAccess

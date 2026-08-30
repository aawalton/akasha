import type { PersonAccess } from "../person-access.page-type.ts"

export const alanPageTypeAll = {
  id: "01a05433-f101-7950-b30b-bf9ea60da403",
  pageTypeSlug: "person-access",
  slug: "alan-page-type-all",
  personAccessPersonSlug: "alan",
  personAccessKind: "page-type",
  personAccessTarget: "all",
} as const satisfies PersonAccess

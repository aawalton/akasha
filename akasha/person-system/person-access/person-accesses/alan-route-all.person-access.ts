import type { PersonAccess } from "../person-access.page-type.ts"

export const alanRouteAll = {
  id: "01a05433-f102-7b74-aa1b-24a3699461b5",
  pageTypeSlug: "person-access",
  slug: "alan-route-all",
  personAccessPersonSlug: "alan",
  personAccessKind: "route",
  personAccessTarget: "all",
} as const satisfies PersonAccess

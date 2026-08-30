import type { PersonAccess } from "../person-access.page-type.ts"

export const alanRouteReadoutFeed = {
  id: "01a05433-f102-758b-be15-975c2ed57114",
  pageTypeSlug: "person-access",
  slug: "alan-route-readout-feed",
  personAccessPersonSlug: "alan",
  personAccessKind: "route",
  personAccessTarget: "readout-feed",
} as const satisfies PersonAccess

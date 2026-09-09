import type { PersonAccess } from "../person-access.page-type.ts"

export const alanRouteReadoutFeed = {
  id: "01a05433-f102-758b-be15-975c2ed57114",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "alan-route-readout-feed",
  person: "alan",
  accessKind: "route",
  target: "readout-feed",
} as const satisfies PersonAccess

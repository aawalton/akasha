import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanRouteReadoutFeed = {
  id: "01a05433-f102-758b-be15-975c2ed57114",
  type: "page-type/person-access",
  slug: "alan-route-readout-feed",
  person: "person/alan",
  accessKind: "access-kind/route",
  target: "readout-feed",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

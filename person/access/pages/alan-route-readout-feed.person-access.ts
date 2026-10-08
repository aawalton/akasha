import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanRouteReadoutFeed = {
  id: "01a05433-f102-758b-be15-975c2ed57114",
  type: "page-type/person-access",
  slug: "alan-route-readout-feed",
  person: "person/alan",
  accessKind: "access-kind/route",
  target: "readout-feed",
  deed: ["access-deed/read"],
  createdAt: "2026-08-30T19:44:45.314Z",
  updatedAt: "2026-09-21T17:03:22.000Z",
} as const satisfies PersonAccess

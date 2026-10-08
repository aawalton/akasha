import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanRouteAll = {
  id: "01a05433-f102-7b74-aa1b-24a3699461b5",
  type: "page-type/person-access",
  slug: "alan-route-all",
  person: "person/alan",
  accessKind: "access-kind/route",
  target: "all",
  deed: ["access-deed/read"],
  createdAt: "2026-08-30T19:44:45.314Z",
  updatedAt: "2026-09-21T17:03:22.000Z",
} as const satisfies PersonAccess

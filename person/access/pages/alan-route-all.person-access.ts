import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanRouteAll = {
  id: "01a05433-f102-7b74-aa1b-24a3699461b5",
  type: "page-type/person-access",
  slug: "alan-route-all",
  person: "person/alan",
  accessKind: "access-kind/route",
  target: "all",
  deed: ["access-deed/read"],
} as const satisfies PersonAccess

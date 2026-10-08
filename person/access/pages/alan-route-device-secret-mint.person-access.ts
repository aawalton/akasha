import type { PersonAccess } from "akasha/person/access/person-access.page-type.types.ts"

export const alanRouteDeviceSecretMint = {
  id: "01a05433-f102-7358-8728-dde431b63a93",
  type: "page-type/person-access",
  slug: "alan-route-device-secret-mint",
  person: "person/alan",
  accessKind: "access-kind/route",
  target: "device-secret-mint",
  deed: ["access-deed/read"],
  createdAt: "2026-08-30T19:44:45.314Z",
  updatedAt: "2026-09-21T17:03:22.000Z",
} as const satisfies PersonAccess

import type { PersonAccess } from "../person-access.page-type.types.ts"

export const alanRouteDeviceSecretMint = {
  id: "01a05433-f102-7358-8728-dde431b63a93",
  pageTypeSlug: "person-access",
  type: "person-access",
  slug: "alan-route-device-secret-mint",
  person: "alan",
  accessKind: "route",
  target: "device-secret-mint",
} as const satisfies PersonAccess

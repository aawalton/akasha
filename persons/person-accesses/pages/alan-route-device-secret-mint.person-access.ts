import type { PersonAccess } from "../person-access.page-type.ts"

export const alanRouteDeviceSecretMint = {
  id: "01a05433-f102-7358-8728-dde431b63a93",
  pageTypeSlug: "person-access",
  slug: "alan-route-device-secret-mint",
  personSlug: "alan",
  accessKind: "route",
  target: "device-secret-mint",
} as const satisfies PersonAccess

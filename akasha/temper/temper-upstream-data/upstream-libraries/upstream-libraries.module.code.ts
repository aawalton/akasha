export const UPSTREAM_LIBRARIES = ["housing", "lib-map-data", "lib-treasure", "lib-zone"] as const

export type UpstreamLibrary = (typeof UPSTREAM_LIBRARIES)[number]

export const PACKAGE_OF: Record<UpstreamLibrary, string> = {
  housing: "temper/game-housing-addon",
  "lib-map-data": "temper/shared-addon-libraries-lib-map-data",
  "lib-treasure": "temper/shared-addon-libraries-lib-treasure",
  "lib-zone": "temper/shared-addon-libraries-lib-zone",
}

export class PortMismatch extends Error {}

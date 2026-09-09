import type { Route } from "@akasha/code/route"

export const alanWebApiDeviceSecretRevoke = {
  id: "01a08835-0ebb-7d95-8b6b-6d1592373149",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-device-secret-revoke",
  definition: "the taking back of one device's secret",
  code: "ts",
  urlPath: "api/device-secret/revoke",
} as const satisfies Route

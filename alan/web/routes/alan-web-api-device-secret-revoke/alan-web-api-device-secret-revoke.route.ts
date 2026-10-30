import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiDeviceSecretRevoke = {
  id: "01a08835-0ebb-7d95-8b6b-6d1592373149",
  type: "page-type/route",
  slug: "alan-web-api-device-secret-revoke",
  definition: "how a device loses its secret",
  code: "ts",
  urlPath: "api/device-secret/revoke",
  createdAt: "2026-09-09T22:06:13.691Z",
  updatedAt: "2026-10-30T16:52:02.044Z",
} as const satisfies Route

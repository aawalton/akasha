import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPushRegister = {
  id: "01a08834-9fa8-7538-bb21-73af9a36b58d",
  type: "page-type/route",
  slug: "alan-web-api-push-register",
  definition: "the device token a reader's app is sent notifications at",
  code: "ts",
  urlPath: "api/push/register",
} as const satisfies Route

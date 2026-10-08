import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPushRegister = {
  id: "01a08822-95b6-72cc-9d33-03c05ed1992a",
  type: "page-type/route",
  slug: "jenny-api-push-register",
  definition: "the device Jenny's app registers to be pushed to",
  code: "ts",
  urlPath: "api/push/register",
  createdAt: "2026-09-09T21:46:03.062Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route

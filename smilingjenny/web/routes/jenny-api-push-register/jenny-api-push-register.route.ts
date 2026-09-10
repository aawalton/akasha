import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const jennyApiPushRegister = {
  id: "01a08822-95b6-72cc-9d33-03c05ed1992a",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-api-push-register",
  definition: "the device Jenny's app registers to be pushed to",
  code: "ts",
  urlPath: "api/push/register",
} as const satisfies Route

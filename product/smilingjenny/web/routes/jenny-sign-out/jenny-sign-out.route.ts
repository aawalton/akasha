import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySignOut = {
  id: "01a08823-3673-774d-8680-c9848b67a258",
  type: "page-type/route",
  slug: "jenny-sign-out",
  definition: "the end of Jenny's session",
  code: "ts",
  urlPath: "sign-out",
} as const satisfies Route

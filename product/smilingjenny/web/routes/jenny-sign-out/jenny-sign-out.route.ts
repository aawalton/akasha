import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySignOut = {
  id: "01a08823-3673-774d-8680-c9848b67a258",
  type: "page-type/route",
  slug: "jenny-sign-out",
  definition: "the path that ends the sign-in session of a browser",
  code: "ts",
  urlPath: "sign-out",
  createdAt: "2026-09-09T21:46:44.211Z",
  updatedAt: "2026-10-30T16:22:16.242Z",
} as const satisfies Route

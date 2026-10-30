import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignOut = {
  id: "01a0c537-bb16-72cb-be23-f3c7b7147680",
  type: "page-type/route",
  slug: "requests-sign-out",
  definition: "the path that ends the sign-in session of a browser",
  code: "ts",
  urlPath: "sign-out",
  createdAt: "2026-09-21T18:25:59.062Z",
  updatedAt: "2026-10-30T16:19:50.452Z",
} as const satisfies Route

import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignOut = {
  id: "01a0c537-bb16-72cb-be23-f3c7b7147680",
  type: "page-type/route",
  slug: "requests-sign-out",
  definition: "the end of a reader's session",
  code: "ts",
  urlPath: "sign-out",
} as const satisfies Route

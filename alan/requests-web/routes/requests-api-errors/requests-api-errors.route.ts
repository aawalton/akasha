import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiErrors = {
  id: "01a0c537-bb53-76c8-bd0f-0cf127c81c89",
  type: "page-type/route",
  slug: "requests-api-errors",
  definition: "the errors a reader's browser reports",
  code: "ts",
  urlPath: "api/errors",
} as const satisfies Route

import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignUp = {
  id: "01a0c537-bb06-72a0-ab2e-0c3c1391870c",
  type: "page-type/route",
  slug: "requests-sign-up",
  definition: "the redirect from signing up to signing in",
  code: "tsx",
  urlPath: "sign-up",
  createdAt: "2026-09-21T18:25:59.046Z",
  updatedAt: "2026-09-21T18:37:14.000Z",
} as const satisfies Route

import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignUp = {
  id: "01a0c537-bb06-72a0-ab2e-0c3c1391870c",
  type: "page-type/route",
  slug: "requests-sign-up",
  definition: "the path that sends a browser to the sign-in page",
  code: "tsx",
  urlPath: "sign-up",
  createdAt: "2026-09-21T18:25:59.046Z",
  updatedAt: "2026-10-30T16:25:03.130Z",
} as const satisfies Route

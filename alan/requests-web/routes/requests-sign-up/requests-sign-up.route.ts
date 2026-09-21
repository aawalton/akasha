import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignUp = {
  id: "01a0c537-bb06-72a0-ab2e-0c3c1391870c",
  type: "page-type/route",
  slug: "requests-sign-up",
  definition: "the redirect from signing up to signing in",
  code: "tsx",
  urlPath: "sign-up",
} as const satisfies Route

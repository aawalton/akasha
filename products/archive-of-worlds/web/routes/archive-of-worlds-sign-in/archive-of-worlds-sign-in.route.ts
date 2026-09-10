import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const archiveOfWorldsSignIn = {
  id: "01a08281-abd1-7cef-b003-c8e010071b28",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-sign-in",
  definition: "where a reader gives the credentials of an account already there",
  code: "tsx",
  urlPath: "sign-in",
} as const satisfies Route

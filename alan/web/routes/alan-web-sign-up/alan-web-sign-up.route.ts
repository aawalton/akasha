import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebSignUp = {
  id: "01a08827-98a9-71fc-9576-3099cfb55bec",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-sign-up",
  definition: "the redirect from signing up to signing in",
  code: "tsx",
  urlPath: "sign-up",
} as const satisfies Route

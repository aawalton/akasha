import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasSignUp = {
  id: "01a08839-6d65-7391-a8e3-4b6f3b0012b7",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-sign-up",
  definition: "the redirect from signing up to signing in",
  code: "tsx",
  urlPath: "sign-up",
} as const satisfies Route

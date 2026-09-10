import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasSignIn = {
  id: "01a08839-e4a2-7fb1-bc8d-19574cec390b",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-sign-in",
  definition: "the form a reader signs in through",
  code: "tsx",
  urlPath: "sign-in",
} as const satisfies Route

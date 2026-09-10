import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebSignIn = {
  id: "01a08827-e090-7b1e-87a7-2838f4274334",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-sign-in",
  definition: "the form a reader signs in through",
  code: "tsx",
  urlPath: "sign-in",
} as const satisfies Route

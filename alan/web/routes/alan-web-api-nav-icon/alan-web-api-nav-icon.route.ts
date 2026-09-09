import type { Route } from "@akasha/code/route"

export const alanWebApiNavIcon = {
  id: "01a0829c-2416-7e2d-a9f1-7c33b625459e",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-nav-icon",
  definition: "the icon drawn for a nav entry",
  code: "ts",
  urlPath: "api/nav-icon/:idSuffix",
} as const satisfies Route

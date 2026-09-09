import type { Route } from "@akasha/code/route"

export const alanWebApiPages = {
  id: "01a0829b-cc74-70fb-9618-e3d4d32044d6",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-pages",
  definition: "the pages of one type a reader asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route

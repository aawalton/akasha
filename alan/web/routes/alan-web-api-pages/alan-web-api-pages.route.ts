import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPages = {
  id: "01a0829b-cc74-70fb-9618-e3d4d32044d6",
  type: "page-type/route",
  slug: "alan-web-api-pages",
  definition: "the pages of a page type a browser asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
  createdAt: "2026-09-08T20:00:43.636Z",
  updatedAt: "2026-10-30T16:58:56.350Z",
} as const satisfies Route

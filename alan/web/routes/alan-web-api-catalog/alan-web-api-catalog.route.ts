import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiCatalog = {
  id: "01a08824-7998-76f0-9b4d-2e03d51237b7",
  type: "page-type/route",
  slug: "alan-web-api-catalog",
  definition: "the roster and pools a reader's idle game is played from",
  code: "ts",
  urlPath: "api/catalog",
} as const satisfies Route

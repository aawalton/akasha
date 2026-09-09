import type { Route } from "@akasha/code/route"

export const alanWebApiCatalog = {
  id: "01a08824-7998-76f0-9b4d-2e03d51237b7",
  pageTypeSlug: "route",
  slug: "alan-web-api-catalog",
  definition: "the roster and pools a reader's idle game is played from",
  code: "ts",
  urlPath: "api/catalog",
} as const satisfies Route

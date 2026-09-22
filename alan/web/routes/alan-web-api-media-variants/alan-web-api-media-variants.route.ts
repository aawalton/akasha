import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiMediaVariants = {
  id: "01a0829c-972b-7a92-93d4-6cbe319c0a5b",
  type: "page-type/route",
  slug: "alan-web-api-media-variants",
  definition: "the variants a page's media can be played as",
  code: "ts",
  urlPath: "api/media/:pageId/variants",
} as const satisfies Route

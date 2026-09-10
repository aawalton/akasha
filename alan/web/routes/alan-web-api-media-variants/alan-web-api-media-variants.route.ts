import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiMediaVariants = {
  id: "01a0829c-972b-7a92-93d4-6cbe319c0a5b",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-variants",
  definition: "the variants one page's media can be played as",
  code: "ts",
  urlPath: "api/media/:pageId/variants",
} as const satisfies Route

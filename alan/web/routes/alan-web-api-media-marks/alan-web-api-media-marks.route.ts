import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiMediaMarks = {
  id: "01a0829e-7811-7794-8296-441764e21588",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-marks",
  definition: "the sentence marks for one page's read-aloud audio",
  code: "ts",
  urlPath: "api/media/:pageId/:medium/marks",
} as const satisfies Route

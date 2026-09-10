import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiMediaHlsSegment = {
  id: "01a082a0-97c1-789d-a1af-a13317edf032",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-hls-segment",
  definition: "one audio segment of a page's HLS playlist",
  code: "ts",
  urlPath: "api/media/:pageId/:medium/hls/:segment",
} as const satisfies Route

import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiMediaStream = {
  id: "01a082a2-0400-7a6d-b281-bf333b47f60d",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-stream",
  definition: "one page's read-aloud audio, sent as the voice makes it",
  code: "ts",
  urlPath: "api/media/:pageId/:medium/stream",
} as const satisfies Route

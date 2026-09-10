import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebApiMedia = {
  id: "01a082a1-706f-7c11-9472-c75f0339085a",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media",
  definition: "the bytes of one page's media in one medium",
  code: "ts",
  urlPath: "api/media/:pageId/:medium",
} as const satisfies Route

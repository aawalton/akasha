import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiMedia = {
  id: "01a082a1-706f-7c11-9472-c75f0339085a",
  type: "page-type/route",
  slug: "alan-web-api-media",
  definition: "the bytes of a page's media in a medium",
  code: "ts",
  urlPath: "api/media/:pageId/:medium",
} as const satisfies Route

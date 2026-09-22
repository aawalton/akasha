import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiMediaHlsPlaylist = {
  id: "01a0829f-e59f-79bc-a367-fb59ee69cf6d",
  type: "page-type/route",
  slug: "alan-web-api-media-hls-playlist",
  definition: "the HLS playlist for a page's read-aloud audio",
  code: "ts",
  urlPath: "api/media/:pageId/:medium/hls.m3u8",
} as const satisfies Route

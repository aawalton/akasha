import type { Route } from "@akasha/code/route"

export const alanWebApiMediaEnsure = {
  id: "01a0829f-0364-7bc7-b0cd-39bbde5f5748",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-media-ensure",
  definition: "the read-aloud rendition of one page, made where it is not there yet",
  code: "ts",
  urlPath: "api/media/:pageId/:medium/ensure",
} as const satisfies Route

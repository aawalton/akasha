import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsPageDetail = {
  id: "01a08283-d64b-74a2-85f7-bac0cabf8c69",
  type: "page-type/route",
  slug: "archive-of-worlds-page-detail",
  definition: "a page shown to a reader on its own",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  createdAt: "2026-09-08T19:34:33.291Z",
  updatedAt: "2026-09-22T10:07:59.000Z",
} as const satisfies Route

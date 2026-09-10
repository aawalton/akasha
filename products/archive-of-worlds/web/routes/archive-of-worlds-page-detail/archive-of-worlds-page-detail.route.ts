import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const archiveOfWorldsPageDetail = {
  id: "01a08283-d64b-74a2-85f7-bac0cabf8c69",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-page-detail",
  definition: "one page shown to a reader on its own",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
} as const satisfies Route

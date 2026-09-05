import type { Route } from "@akasha/code-system/route"

export const pagesReady = {
  id: "01a072b4-378d-70ab-8d75-5361b4ca7293",
  pageTypeSlug: "route",
  slug: "pages-ready",
  definition: "whether this pod can read a page",
  code: "ts",
  test: "ts",
  urlPath: "api/pages-ready",
} as const satisfies Route

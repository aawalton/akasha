import type { Route } from "@akasha/code/route"

export const archiveOfWorldsPageListing = {
  id: "01a08283-636d-77ee-90ed-540060837919",
  pageTypeSlug: "route",
  type: "route",
  slug: "archive-of-worlds-page-listing",
  definition: "the pages of one type a reader is shown",
  code: "tsx",
  urlPath: ":pageTypeSlug",
} as const satisfies Route

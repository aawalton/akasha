import type { PageQuery } from "../page-query.page-type.ts"

export const readoutScalesAll = {
  id: "01a063f9-220d-74da-a444-898491327f69",
  pageTypeSlug: "page-query",
  slug: "readout-scales-all",
  asksOfSlug: "readout-scale",
  keys: ["slug", "yellow-at", "orange-at", "red-at", "black-at"],
} as const satisfies PageQuery

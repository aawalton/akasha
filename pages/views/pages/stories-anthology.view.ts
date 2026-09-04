import type { View } from "../view.page-type.ts"

export const storiesAnthology = {
  id: "01a06577-2615-7007-b148-bbb91ca245fb",
  pageTypeSlug: "view",
  slug: "stories-anthology",
  title: "Anthology",
  navSlug: "stories",
  layout: "list",
  narrows: [{ key: "partOf", comparison: "is", values: ["anthology"] }],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["ownLength", "position"],
  alwaysShowProperties: ["ownLength"],
  hiddenPropertiesOrder: ["partOf", "slug", "unit"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

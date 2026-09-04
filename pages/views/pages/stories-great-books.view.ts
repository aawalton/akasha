import type { View } from "../view.page-type.ts"

export const storiesGreatBooks = {
  id: "01a06577-2615-7008-95fb-bbabc3669aac",
  pageTypeSlug: "view",
  slug: "stories-great-books",
  title: "Great Books",
  navSlug: "stories",
  viewPlace: 3,
  layout: "list",
  narrows: [{ key: "partOf", comparison: "is", values: ["plato-apology-crito"] }],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["ownLength", "status"],
  alwaysShowProperties: ["ownLength"],
  hiddenPropertiesOrder: ["partOf", "position", "slug", "unit"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

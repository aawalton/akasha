import type { View } from "../view.page-type.ts"

export const storiesTheWanderingInn = {
  id: "01a06577-2615-700a-8633-ceb65cac729a",
  pageTypeSlug: "view",
  slug: "stories-the-wandering-inn",
  title: "The Wandering Inn",
  navSlug: "stories",
  viewPlace: 0,
  layout: "list",
  narrows: [
    { key: "partOf", comparison: "is", values: ["the-wandering-inn"] },
    { key: "completedAt", comparison: "empty", values: ["true"] },
  ],
  viewSorts: [{ key: "position", descending: false }],
  visibleProperties: ["ownLength", "publishedAt"],
  alwaysShowProperties: ["ownLength"],
  hiddenPropertiesOrder: ["link", "ownProgress", "partOf", "position", "slug", "unit"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

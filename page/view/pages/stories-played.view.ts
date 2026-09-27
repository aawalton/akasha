import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storiesPlayed = {
  id: "01a0d444-18f3-7b60-b381-1a06a6081457",
  type: "page-type/view",
  slug: "stories-played",
  title: "Played",
  nav: "nav/stories",
  pageType: "page-type/story-played",
  viewPlace: 0,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: [],
} as const satisfies View

import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storiesWritten = {
  id: "01a0e4a3-d9bb-7aae-9b58-d54bbc864314",
  type: "page-type/view",
  slug: "stories-written",
  title: "Written",
  nav: "nav/stories",
  pageType: "page-type/story-written",
  viewPlace: 1,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: [],
} as const satisfies View

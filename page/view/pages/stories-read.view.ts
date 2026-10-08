import type { View } from "akasha/page/view/view.page-type.types.ts"

export const storiesRead = {
  id: "01a0e4a3-fd80-71ee-8f9b-20a086f6a0ee",
  type: "page-type/view",
  slug: "stories-read",
  title: "Read",
  nav: "nav/stories",
  pageType: "page-type/story-read",
  viewPlace: 2,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: [],
  createdAt: "2026-09-27T20:52:27.648Z",
  updatedAt: "2026-09-27T20:52:29.000Z",
} as const satisfies View

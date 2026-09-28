import type { View } from "akasha/page/view/view.page-type.types.ts"

export const chaptersUnread = {
  id: "01a0e996-9366-76d4-aa46-5033bbb97da0",
  type: "page-type/view",
  slug: "chapters-unread",
  title: "Unread",
  nav: "nav/chapters",
  pageType: "page-type/story-chapter-read",
  viewPlace: 0,
  layout: "list",
  narrows: [
    { key: "story.following", comparison: "is", values: ["true"] },
    { key: "own-remaining", comparison: "at-or-after", values: ["1"] },
    { key: "removed-at", comparison: "empty", values: ["true"] },
  ],
  viewSorts: [{ key: "published-at", descending: true }],
  groupSorts: [],
  visibleProperties: ["story", "published-at"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

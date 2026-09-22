import type { View } from "akasha/page/view/view.page-type.types.ts"

export const cursesMostSeen = {
  id: "01a0c954-0ffa-78cf-a65a-9b295bf8f516",
  type: "page-type/view",
  slug: "curses-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-curse",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View

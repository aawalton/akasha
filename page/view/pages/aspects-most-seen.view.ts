import type { View } from "akasha/page/view/view.page-type.types.ts"

export const aspectsMostSeen = {
  id: "01a0c954-0e6a-70cb-b2aa-e92b8e24ec8b",
  type: "page-type/view",
  slug: "aspects-most-seen",
  title: "Most Seen",
  pageType: "page-type/world-aspect",
  viewPlace: 0,
  viewSorts: [{ key: "appearance-count", descending: true }],
} as const satisfies View

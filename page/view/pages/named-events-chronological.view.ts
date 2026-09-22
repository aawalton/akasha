import type { View } from "akasha/page/view/view.page-type.types.ts"

export const namedEventsChronological = {
  id: "01a0c954-13cd-7a1a-86df-00ca8eabf31e",
  type: "page-type/view",
  slug: "named-events-chronological",
  title: "Chronological",
  pageType: "page-type/named-event",
  viewPlace: 0,
  viewSorts: [{ key: "first-chapter", descending: false }],
} as const satisfies View

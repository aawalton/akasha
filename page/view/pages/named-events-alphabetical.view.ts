import type { View } from "akasha/page/view/view.page-type.types.ts"

export const namedEventsAlphabetical = {
  id: "01a0c954-13eb-74dc-9351-31b120fafd29",
  type: "page-type/view",
  slug: "named-events-alphabetical",
  title: "Alphabetical",
  pageType: "page-type/named-event",
  viewPlace: 1,
  viewSorts: [{ key: "title", descending: false }],
} as const satisfies View

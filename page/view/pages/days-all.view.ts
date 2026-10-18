import type { View } from "akasha/page/view/view.page-type.types.ts"

export const daysAll = {
  id: "01a14f38-d970-733a-98b9-ece55ee08fec",
  type: "page-type/view",
  slug: "days-all",
  title: "All",
  nav: "nav/days",
  pageType: "page-type/day",
  viewPlace: 1,
  layout: "table",
  narrows: [],
  viewSorts: [{ key: "date", descending: true }],
  groupBy: "date",
  groupSorts: [{ key: "date", descending: true }],
  groupGranularity: "week",
  visibleProperties: ["stoplights"],
  alwaysShowProperties: ["stoplights"],
  createdAt: "2026-10-18T13:34:48.175Z",
  updatedAt: "2026-10-18T14:18:56.845Z",
} as const satisfies View

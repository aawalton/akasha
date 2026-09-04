import type { View } from "../view.page-type.ts"

export const idleRosterCards = {
  id: "01a06577-2614-7019-b9f7-27b75029b560",
  pageTypeSlug: "view",
  slug: "idle-roster-cards",
  title: "Cards",
  navSlug: "idle-roster",
  viewPlace: 0,
  layout: "gallery",
  groupSorts: [{ key: "lock-state", descending: false }],
  groupBy: "lock-state",
  visibleProperties: ["stars", "rank"],
  pageSize: 50,
  itemPageSize: 12,
  groupPageSize: 6,
  galleryCoverSource: "cover",
  galleryCardSize: "small",
  liveRefreshMs: 1000,
  lockedPageType: true,
} as const satisfies View

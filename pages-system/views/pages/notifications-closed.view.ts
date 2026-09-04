import type { View } from "../view.page-type.ts"

export const notificationsClosed = {
  id: "01a06577-2614-701c-92b8-fc33a64fcfb4",
  pageTypeSlug: "view",
  slug: "notifications-closed",
  title: "Closed",
  navSlug: "notifications",
  drawsSlug: "notification",
  viewPlace: 1,
  layout: "list",
  viewSorts: [{ key: "sent-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

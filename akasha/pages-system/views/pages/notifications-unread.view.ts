import type { View } from "../view.page-type.ts"

export const notificationsUnread = {
  id: "01a06577-2614-701d-8a11-e9989b1c3a6c",
  pageTypeSlug: "view",
  slug: "notifications-unread",
  title: "Unread",
  navSlug: "notifications",
  drawsSlug: "notification",
  viewPlace: 0,
  layout: "list",
  narrows: [{ key: "cover", comparison: "empty", values: ["false"] }],
  viewSorts: [{ key: "sent-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View

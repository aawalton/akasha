import type { PageQuery } from "../page-query.page-type.ts"

export const notificationAll = {
  id: "01a063f9-220b-760d-80bc-606d6f42aa63",
  pageTypeSlug: "page-query",
  slug: "notification-all",
  asksOfSlug: "notification",
  keys: ["title", "body", "kind", "link", "source", "sent-at", "read-at"],
  sortBy: "sent-at",
} as const satisfies PageQuery

import type { PageQuery } from "../page-query.page-type.ts"

export const calendarEventSourcesAll = {
  id: "01a063f9-2209-7252-b25c-3bb613dbf522",
  pageTypeSlug: "page-query",
  slug: "calendar-event-sources-all",
  asksOfSlug: "calendar-event-source",
  keys: [
    "slug",
    "external-id",
    "kind",
    "base-url",
    "feed-url",
    "timezone",
    "provider-client",
    "sync-status",
  ],
} as const satisfies PageQuery

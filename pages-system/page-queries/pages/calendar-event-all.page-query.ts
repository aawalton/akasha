import type { PageQuery } from "../page-query.page-type.ts"

export const calendarEventAll = {
  id: "01a063f9-2209-7a1b-a11b-acfbf98a982e",
  pageTypeSlug: "page-query",
  slug: "calendar-event-all",
  asksOfSlug: "calendar-event",
  keys: [
    "title",
    "external-id",
    "external-link",
    "start-at",
    "end-at",
    "all-day",
    "location",
    "description",
    "event-types",
    "age-groups",
    "tags",
    "image-url",
    "max-attendees",
    "registration-required",
    "registration-opens-at",
    "registration-url",
    "last-synced-at",
  ],
} as const satisfies PageQuery

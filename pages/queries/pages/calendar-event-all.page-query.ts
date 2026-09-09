import type { PageQuery } from "../page-query.page-type.ts"

export const calendarEventAll = {
  id: "01a063f9-2209-7a1b-a11b-acfbf98a982e",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "calendar-event-all",
  asksOfSlug: "calendar-event",
  keys: [
    "title",
    "externalId",
    "externalLink",
    "startAt",
    "endAt",
    "allDay",
    "location",
    "description",
    "eventTypes",
    "ageGroups",
    "tags",
    "imageUrl",
    "maxAttendees",
    "registrationRequired",
    "registrationOpensAt",
    "registrationUrl",
    "lastSyncedAt",
  ],
} as const satisfies PageQuery

import type { CalendarEventSource } from "../../calendar-event-source.page-type.ts"

export const provoLibrary = {
  id: "019e9cde-8e04-7e8e-8ffa-b8ca40f2a0d8",
  pageTypeSlug: "calendar-event-source",
  slug: "provo-library",
  title: "Provo City Library",
  externalId: "provo-library",
  kind: "communico",
  baseUrl: "https://provolibrary.gov",
  feedUrl:
    "https://provolibrary.gov/feeds?data=eyJmZWVkVHlwZSI6ImljYWwiLCJmaWx0ZXJzIjp7ImxvY2F0aW9uIjpbImFsbCJdLCJhZ2VzIjpbImFsbCJdLCJ0eXBlcyI6WyJhbGwiXSwidGFncyI6W10sInRlcm0iOiIiLCJkYXlzIjoxfX0=",
  detailUrlTemplate: "https://provolibrary.gov/event/{uid}",
  timezone: "America/Denver",
  providerClient: "provolibrary",
  color: "blue",
  events: "jsonl",
} as const satisfies CalendarEventSource

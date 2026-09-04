import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Events = "jsonl"

export const events = {
  id: "01a06868-aec4-7f27-ae51-0a56d9b397f6",
  pageTypeSlug: "page-property-entry",
  slug: "events",
  propertySlug: "events",
  definition: "every event a source publishes, one to a line",
  properties: [
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "slug", required: true, many: false },
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "calendar-event-external-id", required: false, many: false },
    { pagePropertySlug: "calendar-event-external-link", required: false, many: false },
    { pagePropertySlug: "calendar-event-start-at", required: false, many: false },
    { pagePropertySlug: "calendar-event-end-at", required: false, many: false },
    { pagePropertySlug: "calendar-event-all-day", required: false, many: false },
    { pagePropertySlug: "calendar-event-location", required: false, many: false },
    { pagePropertySlug: "calendar-event-description", required: false, many: false },
    { pagePropertySlug: "calendar-event-types", required: false, many: true, max: 20 },
    { pagePropertySlug: "calendar-event-age-groups", required: false, many: true, max: 20 },
    { pagePropertySlug: "calendar-event-tags", required: false, many: true, max: 20 },
    { pagePropertySlug: "calendar-event-image-url", required: false, many: false },
    { pagePropertySlug: "calendar-event-max-attendees", required: false, many: false },
    { pagePropertySlug: "calendar-event-registration-required", required: false, many: false },
    { pagePropertySlug: "calendar-event-registration-opens-at", required: false, many: false },
    { pagePropertySlug: "calendar-event-registration-url", required: false, many: false },
    { pagePropertySlug: "calendar-event-last-synced-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An event stands beside the source publishing it rather than in a page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every event a source publishes is written again on every pass.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is slugged by the id the source gives the event.",
    },
  ],
} as const satisfies PagePropertyEntry

import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Events = "jsonl"

export const events = {
  id: "01a06868-aec4-7f27-ae51-0a56d9b397f6",
  pageTypeSlug: "page-property-entry",
  slug: "events",
  propertySlug: "events",
  definition: "every event a source publishes, one to a line",
  properties: [
    { pagePropertySlug: "number-property/seq", required: true, many: false },
    { pagePropertySlug: "text-property/slug", required: true, many: false },
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/calendar-event-external-id", required: false, many: false },
    { pagePropertySlug: "url-property/calendar-event-external-link", required: false, many: false },
    { pagePropertySlug: "instant-property/calendar-event-start-at", required: false, many: false },
    { pagePropertySlug: "instant-property/calendar-event-end-at", required: false, many: false },
    { pagePropertySlug: "boolean-property/calendar-event-all-day", required: false, many: false },
    { pagePropertySlug: "text-property/calendar-event-location", required: false, many: false },
    { pagePropertySlug: "text-property/calendar-event-description", required: false, many: false },
    {
      pagePropertySlug: "text-property/calendar-event-types",
      required: false,
      many: true,
      max: 20,
    },
    {
      pagePropertySlug: "text-property/calendar-event-age-groups",
      required: false,
      many: true,
      max: 20,
    },
    { pagePropertySlug: "text-property/calendar-event-tags", required: false, many: true, max: 20 },
    { pagePropertySlug: "url-property/calendar-event-image-url", required: false, many: false },
    {
      pagePropertySlug: "number-property/calendar-event-max-attendees",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "boolean-property/calendar-event-registration-required",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "instant-property/calendar-event-registration-opens-at",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "url-property/calendar-event-registration-url",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "instant-property/calendar-event-last-synced-at",
      required: false,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An event sits beside the source publishing that event rather than in a page of its own.",
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

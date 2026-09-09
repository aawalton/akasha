import type { PageType } from "@akasha/pages/page-type"

export const calendarEventSource = {
  id: "01a06836-795a-7684-9968-814f598da8e3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "calendar-event-source",
  definition: "another calendar read for the events it publishes",
  pluralSlug: "calendar-event-sources",
  extends: ["page-type/page"],
  parts: [
    "page-property-entry/events",
    "text-property/calendar-source-color",
    "text-property/calendar-source-detail-url-template",
    "text-property/calendar-source-external-id",
    "text-property/calendar-source-kind",
    "text-property/calendar-source-provider-client",
    "text-property/calendar-source-sync-status",
    "text-property/calendar-source-timezone",
    "url-property/calendar-source-base-url",
    "url-property/calendar-source-feed-url",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/calendar-source-external-id", required: true, many: false },
    { pageProperty: "text-property/calendar-source-kind", required: true, many: false },
    { pageProperty: "url-property/calendar-source-base-url", required: true, many: false },
    { pageProperty: "url-property/calendar-source-feed-url", required: true, many: false },
    { pageProperty: "text-property/calendar-source-timezone", required: true, many: false },
    {
      pageProperty: "text-property/calendar-source-provider-client",
      required: true,
      many: false,
    },
    {
      pageProperty: "text-property/calendar-source-detail-url-template",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/calendar-source-color", required: false, many: false },
    { pageProperty: "text-property/calendar-source-sync-status", required: false, many: false },
    { pageProperty: "page-property-entry/events", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is slugged by the identifier the source gives itself.",
    },
    {
      invariantKind: "departure",
      statement: "Every event a source publishes is read on every pass.",
    },
    {
      invariantKind: "absence",
      statement: "A source says nothing about the changes after the last reading.",
    },
    {
      invariantKind: "departure",
      statement: "A source stating no sync status is read on a pass.",
    },
  ],
  types: "ts",
} as const satisfies PageType

import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { CalendarSourceBaseUrl } from "./properties/calendar-source-base-url.url-property.ts"
import type { CalendarSourceColor } from "./properties/calendar-source-color.text-property.ts"
import type { CalendarSourceDetailUrlTemplate } from "./properties/calendar-source-detail-url-template.text-property.ts"
import type { CalendarSourceExternalId } from "./properties/calendar-source-external-id.text-property.ts"
import type { CalendarSourceFeedUrl } from "./properties/calendar-source-feed-url.url-property.ts"
import type { CalendarSourceKind } from "./properties/calendar-source-kind.text-property.ts"
import type { CalendarSourceProviderClient } from "./properties/calendar-source-provider-client.text-property.ts"
import type { CalendarSourceSyncStatus } from "./properties/calendar-source-sync-status.text-property.ts"
import type { CalendarSourceTimezone } from "./properties/calendar-source-timezone.text-property.ts"
import type { Events } from "./properties/events.page-property-entry.ts"

export type CalendarEventSource = Page & {
  title: Title
  externalId: CalendarSourceExternalId
  kind: CalendarSourceKind
  baseUrl: CalendarSourceBaseUrl
  feedUrl: CalendarSourceFeedUrl
  timezone: CalendarSourceTimezone
  providerClient: CalendarSourceProviderClient
  detailUrlTemplate?: CalendarSourceDetailUrlTemplate
  color?: CalendarSourceColor
  syncStatus?: CalendarSourceSyncStatus
  events?: Events
}

export const calendarEventSource = {
  id: "01a06836-795a-7684-9968-814f598da8e3",
  pageTypeSlug: "page-type",
  slug: "calendar-event-source",
  definition: "another calendar read for the events it publishes",
  pluralSlug: "calendar-event-sources",
  extendsSlug: ["page-type/page"],
  partSlugs: [
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
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "calendar-source-external-id", required: true, many: false },
    { pagePropertySlug: "calendar-source-kind", required: true, many: false },
    { pagePropertySlug: "calendar-source-base-url", required: true, many: false },
    { pagePropertySlug: "calendar-source-feed-url", required: true, many: false },
    { pagePropertySlug: "calendar-source-timezone", required: true, many: false },
    { pagePropertySlug: "calendar-source-provider-client", required: true, many: false },
    { pagePropertySlug: "calendar-source-detail-url-template", required: false, many: false },
    { pagePropertySlug: "calendar-source-color", required: false, many: false },
    { pagePropertySlug: "calendar-source-sync-status", required: false, many: false },
    { pagePropertySlug: "events", required: false, many: false },
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
      statement: "A source says nothing about what changed since the last pass.",
    },
    {
      invariantKind: "departure",
      statement: "A source stating no sync status is read on a pass.",
    },
  ],
} as const satisfies PageType

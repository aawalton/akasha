import type { Page } from "../../../pages/page.page-type.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
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

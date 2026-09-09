import type { Page } from "../../../../pages/page.page-type.ts"
import type { CalendarEventAgeGroups } from "./properties/calendar-event-age-groups.text-property.ts"
import type { CalendarEventAllDay } from "./properties/calendar-event-all-day.boolean-property.ts"
import type { CalendarEventEndAt } from "./properties/calendar-event-end-at.instant-property.ts"
import type { CalendarEventExternalId } from "./properties/calendar-event-external-id.text-property.ts"
import type { CalendarEventExternalLink } from "./properties/calendar-event-external-link.url-property.ts"
import type { CalendarEventImageUrl } from "./properties/calendar-event-image-url.url-property.ts"
import type { CalendarEventLastSyncedAt } from "./properties/calendar-event-last-synced-at.instant-property.ts"
import type { CalendarEventLocation } from "./properties/calendar-event-location.text-property.ts"
import type { CalendarEventMaxAttendees } from "./properties/calendar-event-max-attendees.number-property.ts"
import type { CalendarEventRegistrationOpensAt } from "./properties/calendar-event-registration-opens-at.instant-property.ts"
import type { CalendarEventRegistrationRequired } from "./properties/calendar-event-registration-required.boolean-property.ts"
import type { CalendarEventRegistrationUrl } from "./properties/calendar-event-registration-url.url-property.ts"
import type { CalendarEventSourceDescription } from "./properties/calendar-event-source-description.text-property.ts"
import type { CalendarEventStartAt } from "./properties/calendar-event-start-at.instant-property.ts"
import type { CalendarEventTags } from "./properties/calendar-event-tags.text-property.ts"
import type { CalendarEventTypes } from "./properties/calendar-event-types.text-property.ts"

export type CalendarEvent = Page & {
  externalId?: CalendarEventExternalId
  externalLink?: CalendarEventExternalLink
  startAt?: CalendarEventStartAt
  endAt?: CalendarEventEndAt
  allDay?: CalendarEventAllDay
  location?: CalendarEventLocation
  sourceDescription?: CalendarEventSourceDescription
  eventTypes?: CalendarEventTypes
  ageGroups?: CalendarEventAgeGroups
  tags?: CalendarEventTags
  imageUrl?: CalendarEventImageUrl
  maxAttendees?: CalendarEventMaxAttendees
  registrationRequired?: CalendarEventRegistrationRequired
  registrationOpensAt?: CalendarEventRegistrationOpensAt
  registrationUrl?: CalendarEventRegistrationUrl
  lastSyncedAt?: CalendarEventLastSyncedAt
}

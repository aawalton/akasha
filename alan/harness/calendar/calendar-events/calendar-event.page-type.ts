import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { CalendarEventAgeGroups } from "./properties/calendar-event-age-groups.text-property.ts"
import type { CalendarEventAllDay } from "./properties/calendar-event-all-day.boolean-property.ts"
import type { CalendarEventDescription } from "./properties/calendar-event-description.text-property.ts"
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
  description?: CalendarEventDescription
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

export const calendarEvent = {
  id: "01a06836-795a-7511-bf90-ba565a6bcdf9",
  pageTypeSlug: "page-type",
  slug: "calendar-event",
  definition: "an occasion at a set time somebody may attend",
  pluralSlug: "calendar-events",
  partSlugs: [
    "boolean-property/calendar-event-all-day",
    "boolean-property/calendar-event-registration-required",
    "instant-property/calendar-event-end-at",
    "instant-property/calendar-event-last-synced-at",
    "instant-property/calendar-event-registration-opens-at",
    "instant-property/calendar-event-start-at",
    "number-property/calendar-event-max-attendees",
    "text-property/calendar-event-age-groups",
    "text-property/calendar-event-description",
    "text-property/calendar-event-external-id",
    "text-property/calendar-event-location",
    "text-property/calendar-event-tags",
    "text-property/calendar-event-types",
    "url-property/calendar-event-external-link",
    "url-property/calendar-event-image-url",
    "url-property/calendar-event-registration-url",
  ],
  extendsSlug: ["page-type/page"],
  properties: [
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
      statement: "The word primary names Alan's own calendar rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "Reading an event or deleting one acts as the service account.",
    },
    {
      invariantKind: "departure",
      statement: "Creating an event or changing or answering one acts as Alan.",
    },
    {
      invariantKind: "departure",
      statement: "An event sits beside the source publishing that event rather than in a row.",
    },
  ],
} as const satisfies PageType

import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CalendarEvent = Page

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
      statement: "An event stands beside the source publishing it rather than in a row.",
    },
  ],
} as const satisfies PageType

import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CalendarEvent = Page

export const calendarEvent = {
  id: "01a06836-795a-7511-bf90-ba565a6bcdf9",
  pageTypeSlug: "page-type",
  slug: "calendar-event",
  definition: "an occasion at a set time somebody may attend",
  pluralSlug: "calendar-events",
  extendsSlug: "page-type/page",
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

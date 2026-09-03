import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type CalendarEventSource = Page

export const calendarEventSource = {
  id: "01a06836-795a-7684-9968-814f598da8e3",
  pageTypeSlug: "page-type",
  slug: "calendar-event-source",
  definition: "another calendar read for the events it publishes",
  pluralSlug: "calendar-event-sources",
  extendsSlug: "page-type/page",
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
  ],
} as const satisfies PageType

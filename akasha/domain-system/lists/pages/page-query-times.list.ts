import type { List } from "../list.page-type.ts"

export const pageQueryTimes = {
  id: "01a06869-a968-7a43-ad89-64ee5d9b58fb",
  pageTypeSlug: "list",
  slug: "page-query-times",
  definition: "the points in time a page query can name",
  members: [
    { memberName: "now", definition: "the moment the query is answered" },
    { memberName: "eso-day", definition: "counted from six in the morning, New York" },
    {
      memberName: "eso-day-next",
      definition: "the eso day after the one the query is answered in",
    },
    { memberName: "wake-day", definition: "counted from the moment Alan wakes" },
  ],
} as const satisfies List

import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sampleSelecting = {
  id: "01a05bc7-9129-7004-a85c-285fd90a0c08",
  pageTypeSlug: "module",
  slug: "sample-selecting",
  definition: "the readings of one metric over a span of time, oldest first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is read off the rows kept beside the day page it was filed under.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a rows file sits is asked of the name a page's property file is built under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day's rows are reached through that day's page rather than by a path built here.",
    },
    {
      invariantKind: "departure",
      statement: "A day's folder is named for that day's date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A span with no reading is answered empty rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "A row with a metric other than the metric asked for is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "Readings come back oldest first by the instant a reading began.",
    },
    {
      invariantKind: "departure",
      statement: "The day either side of the span is read too.",
    },
    {
      invariantKind: "departure",
      statement: "A span running from one day into the next is answered whole.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks the pages system service.",
    },
  ],
} as const satisfies Module

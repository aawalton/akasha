import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Date as TrackedDate } from "../../alan/track/days/properties/date.text-property.ts"
import type { Lines } from "./properties/lines.file-property.ts"
import type { LogSource } from "./properties/log-source.relation-property.ts"
import type { SeatName } from "./properties/seat-name.text-property.ts"

export type SeatLogDay = Page & {
  source: LogSource
  seatName: SeatName
  date: TrackedDate
  lines?: Lines
}

export const seatLogDay = {
  id: "01a0657c-cb14-7b5b-a206-18059a84a88a",
  pageTypeSlug: "page-type",
  slug: "seat-log-day",
  definition: "what one source wrote for one seat on one day",
  pluralSlug: "seat-log-days",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "module/log-day-sweeping",
    "module/log-day-writing",
    "file-property/lines",
    "relation-property/log-source",
    "text-property/seat-name",
  ],
  properties: [
    { pageProperty: "relation-property/log-source", required: true, many: false },
    { pageProperty: "text-property/seat-name", required: true, many: false },
    { pageProperty: "text-property/date", required: true, many: false },
    {
      pageProperty: "file-property/lines",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page has one source's lines for one seat on one day.",
    },
    {
      invariantKind: "departure",
      statement: "A day's slug joins its source to its seat to its date.",
    },
    {
      invariantKind: "departure",
      statement: "A day is judged by the date the day states rather than by a file's timestamp.",
    },
    {
      invariantKind: "departure",
      statement: "A day past the window a log is kept for is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The page is committed and the lines beside that page are not.",
    },
    {
      invariantKind: "departure",
      statement: "Removing the page removes the lines with that page.",
    },
    {
      invariantKind: "departure",
      statement: "These lines record the work the processes did.",
    },
    {
      invariantKind: "absence",
      statement: "No line here records the work the agent did.",
    },
    {
      invariantKind: "departure",
      statement: "The work the agent did is in the commits the agent landed.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing reads the lines a day has.",
    },
  ],
} as const satisfies PageType

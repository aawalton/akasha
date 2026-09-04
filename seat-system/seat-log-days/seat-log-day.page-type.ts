import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Date as TrackedDate } from "../../alan/tracking/daily/wake-days/properties/date.text-property.ts"
import type { Lines } from "./properties/lines.file-property.ts"
import type { SeatName } from "./properties/seat-name.text-property.ts"
import type { SourceSlug } from "./properties/source-slug.relation-property.ts"

export type SeatLogDay = Page & {
  sourceSlug: SourceSlug
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
  extendsSlug: ["page-type/page"],
  mortal: true,
  partSlugs: ["file-property/lines", "relation-property/source-slug", "text-property/seat-name"],
  properties: [
    { pagePropertySlug: "source-slug", required: true, many: false },
    { pagePropertySlug: "seat-name", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    {
      pagePropertySlug: "lines",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page holds one source's lines for one seat on one day.",
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
      statement: "The page is committed and the lines beside it are not.",
    },
    {
      invariantKind: "departure",
      statement: "Removing the page removes the lines with it.",
    },
    {
      invariantKind: "departure",
      statement: "These lines record what the processes did.",
    },
    {
      invariantKind: "absence",
      statement: "No line here records what the agent did.",
    },
    {
      invariantKind: "departure",
      statement: "What the agent did is in the commits the agent landed.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing reads the lines a day holds.",
    },
  ],
} as const satisfies PageType

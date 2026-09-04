import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Note } from "../set-logs/properties/note.text-property.ts"
import type { Context } from "./properties/context.select-property.ts"
import type { MobilityReadingDate } from "./properties/mobility-reading-date.calendar-date-property.ts"
import type { MobilityReadingMetric } from "./properties/mobility-reading-metric.select-property.ts"
import type { MobilityReadingValueNum } from "./properties/mobility-reading-value-num.number-property.ts"
import type { MobilityReadingValueText } from "./properties/mobility-reading-value-text.text-property.ts"
import type { Side } from "./properties/side.select-property.ts"

export type MobilityReading = Page & {
  title: Title
  context: Context
  mobilityReadingDate: MobilityReadingDate
  mobilityReadingMetric: MobilityReadingMetric
  side: Side
  mobilityReadingValueNum?: MobilityReadingValueNum
  mobilityReadingValueText: MobilityReadingValueText
  note?: Note
}

export const mobilityReading = {
  id: "01a06558-36e9-75e2-bcf3-ce91fd6e945b",
  pageTypeSlug: "page-type",
  slug: "mobility-reading",
  definition: "one measurement of how far a joint moved on a day",
  pluralSlug: "mobility-readings",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "calendar-date-property/mobility-reading-date",
    "number-property/mobility-reading-value-num",
    "select-property/context",
    "select-property/mobility-reading-metric",
    "select-property/side",
    "text-property/mobility-reading-value-text",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "context", required: true, many: false },
    { pagePropertySlug: "mobility-reading-date", required: true, many: false },
    { pagePropertySlug: "mobility-reading-metric", required: true, many: false },
    { pagePropertySlug: "side", required: true, many: false },
    { pagePropertySlug: "mobility-reading-value-num", required: false, many: false },
    { pagePropertySlug: "mobility-reading-value-text", required: true, many: false },
    { pagePropertySlug: "text-property/note", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reading names no session the reading was taken in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading always carries a human read of the measurement.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading carries a number beside its human read where the metric is measured in numbers.",
    },
  ],
} as const satisfies PageType

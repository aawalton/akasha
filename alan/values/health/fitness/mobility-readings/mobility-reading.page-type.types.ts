import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
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

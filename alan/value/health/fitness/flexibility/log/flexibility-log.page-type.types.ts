import type { Context } from "akasha/alan/value/health/fitness/flexibility/log/properties/context.select-property.types.ts"
import type { MobilityReadingDate } from "akasha/alan/value/health/fitness/flexibility/log/properties/mobility-reading-date.calendar-date-property.types.ts"
import type { MobilityReadingMetric } from "akasha/alan/value/health/fitness/flexibility/log/properties/mobility-reading-metric.select-property.types.ts"
import type { MobilityReadingValueNum } from "akasha/alan/value/health/fitness/flexibility/log/properties/mobility-reading-value-num.number-property.types.ts"
import type { MobilityReadingValueText } from "akasha/alan/value/health/fitness/flexibility/log/properties/mobility-reading-value-text.text-property.types.ts"
import type { Side } from "akasha/alan/value/health/fitness/flexibility/log/properties/side.select-property.types.ts"
import type { Note } from "akasha/alan/value/health/fitness/strength/log/properties/note.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type FlexibilityLog = Page & {
  title: Title
  context: Context
  mobilityReadingDate: MobilityReadingDate
  mobilityReadingMetric: MobilityReadingMetric
  side: Side
  mobilityReadingValueNum?: MobilityReadingValueNum
  mobilityReadingValueText: MobilityReadingValueText
  note?: Note
}

import type { Context } from "akasha/alan/values/health/fitness/flexibility/logs/properties/context.select-property.types.ts"
import type { MobilityReadingDate } from "akasha/alan/values/health/fitness/flexibility/logs/properties/mobility-reading-date.calendar-date-property.types.ts"
import type { MobilityReadingMetric } from "akasha/alan/values/health/fitness/flexibility/logs/properties/mobility-reading-metric.select-property.types.ts"
import type { MobilityReadingValueNum } from "akasha/alan/values/health/fitness/flexibility/logs/properties/mobility-reading-value-num.number-property.types.ts"
import type { MobilityReadingValueText } from "akasha/alan/values/health/fitness/flexibility/logs/properties/mobility-reading-value-text.text-property.types.ts"
import type { Side } from "akasha/alan/values/health/fitness/flexibility/logs/properties/side.select-property.types.ts"
import type { Note } from "akasha/alan/values/health/fitness/strength-logs/properties/note.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

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

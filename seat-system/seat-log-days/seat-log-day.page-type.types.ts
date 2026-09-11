import type { Date as SeatLogDayDate } from "akasha/alan/track/daily/days/properties/date.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Lines } from "akasha/seat-system/seat-log-days/properties/lines.file-property.ts"
import type { LogSource } from "akasha/seat-system/seat-log-days/properties/log-source.relation-property.types.ts"
import type { SeatName } from "akasha/seat-system/seat-log-days/properties/seat-name.text-property.ts"

export type SeatLogDay = Page & {
  source: LogSource
  seatName: SeatName
  date: SeatLogDayDate
  lines?: Lines
}

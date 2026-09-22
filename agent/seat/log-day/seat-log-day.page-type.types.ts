import type { Lines } from "akasha/agent/seat/log-day/properties/lines.file-property.types.ts"
import type { LogSource } from "akasha/agent/seat/log-day/properties/log-source.relation-property.types.ts"
import type { SeatName } from "akasha/agent/seat/log-day/properties/seat-name.text-property.types.ts"
import type { Date as SeatLogDayDate } from "akasha/alan/track/daily/day/properties/date.calendar-date-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SeatLogDay = Page & {
  source: LogSource
  seatName: SeatName
  date: SeatLogDayDate
  lines?: Lines
}

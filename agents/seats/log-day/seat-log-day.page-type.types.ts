import type { Lines } from "akasha/agents/seats/log-day/properties/lines.file-property.types.ts"
import type { LogSource } from "akasha/agents/seats/log-day/properties/log-source.relation-property.types.ts"
import type { SeatName } from "akasha/agents/seats/log-day/properties/seat-name.text-property.types.ts"
import type { Date as SeatLogDayDate } from "akasha/alan/track/daily/days/properties/date.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type SeatLogDay = Page & {
  source: LogSource
  seatName: SeatName
  date: SeatLogDayDate
  lines?: Lines
}

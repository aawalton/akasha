import type { Date as SeatLogDayDate } from "../../alan/track/daily/days/properties/date.text-property.ts"
import type { Page } from "../../pages/page.page-type.types.ts"
import type { Lines } from "./properties/lines.file-property.ts"
import type { LogSource } from "./properties/log-source.relation-property.ts"
import type { SeatName } from "./properties/seat-name.text-property.ts"

export type SeatLogDay = Page & {
  source: LogSource
  seatName: SeatName
  date: SeatLogDayDate
  lines?: Lines
}

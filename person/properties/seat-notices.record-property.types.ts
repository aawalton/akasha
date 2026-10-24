import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { NoticeSeat } from "akasha/person/properties/notice-seat.text-property.types.ts"
import type { SeatNotice } from "akasha/person/properties/seat-notice.select-property.types.ts"

export type SeatNotices = List<{
  seat: NoticeSeat
  notice: SeatNotice
}>

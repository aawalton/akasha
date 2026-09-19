import type { DayOfWeek } from "akasha/alan/value/health/fitness/coaching/schedule/day/properties/day-of-week.select-property.types.ts"
import type { Focus } from "akasha/alan/value/health/fitness/coaching/schedule/day/properties/focus.select-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ScheduleDay = Page & {
  title: Title
  dayOfWeek: DayOfWeek
  focus: Focus
}

import type { DayOfWeek } from "akasha/alan/values/health/fitness/coaching/schedule/days/properties/day-of-week.select-property.types.ts"
import type { Focus } from "akasha/alan/values/health/fitness/coaching/schedule/days/properties/focus.select-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type CoachingScheduleDay = Page & {
  title: Title
  dayOfWeek: DayOfWeek
  focus: Focus
}

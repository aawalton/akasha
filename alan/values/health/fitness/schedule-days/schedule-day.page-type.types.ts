import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { DayOfWeek } from "./properties/day-of-week.select-property.ts"
import type { Focus } from "./properties/focus.select-property.ts"

export type ScheduleDay = Page & {
  title: Title
  dayOfWeek: DayOfWeek
  focus: Focus
}

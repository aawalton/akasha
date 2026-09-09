import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { DayOfWeek } from "./properties/day-of-week.select-property.ts"
import type { Focus } from "./properties/focus.select-property.ts"

export type ScheduleDay = Page & {
  title: Title
  dayOfWeek: DayOfWeek
  focus: Focus
}

export const scheduleDay = {
  id: "01a0657a-e62d-71ab-9830-6a438684618d",
  pageTypeSlug: "page-type",
  slug: "schedule-day",
  definition: "one day of a training rotation, and what it trains",
  pluralSlug: "schedule-days",
  extends: ["page-type/page"],
  parts: ["select-property/day-of-week", "select-property/focus"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/day-of-week", required: true, many: false },
    { pageProperty: "select-property/focus", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day states the weekday that day falls on and what that day trains.",
    },
    {
      invariantKind: "absence",
      statement: "A day names no rotation the day belongs to.",
    },
  ],
} as const satisfies PageType

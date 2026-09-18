import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const tuesday = {
  id: "019ee083-1a5e-70f3-a1aa-8af06a946fb1",
  type: "page-type/coaching-schedule-day",
  slug: "tuesday",
  title: "Tuesday — pull",
  dayOfWeek: "tuesday",
  focus: "pull",
} as const satisfies CoachingScheduleDay

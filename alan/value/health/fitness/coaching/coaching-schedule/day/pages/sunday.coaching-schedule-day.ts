import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const sunday = {
  id: "019ee083-1c1f-7882-afef-c445c9aadc17",
  type: "page-type/coaching-schedule-day",
  slug: "sunday",
  title: "Sunday — rest",
  dayOfWeek: "sunday",
  focus: "rest",
} as const satisfies CoachingScheduleDay

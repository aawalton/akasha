import type { ScheduleDay } from "akasha/alan/value/health/fitness/coaching/schedule/day/schedule-day.page-type.types.ts"

export const sunday = {
  id: "019ee083-1c1f-7882-afef-c445c9aadc17",
  type: "page-type/schedule-day",
  slug: "sunday",
  title: "Sunday — rest",
  dayOfWeek: "sunday",
  focus: "rest",
} as const satisfies ScheduleDay

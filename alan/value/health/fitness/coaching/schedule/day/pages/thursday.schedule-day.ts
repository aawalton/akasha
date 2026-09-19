import type { ScheduleDay } from "akasha/alan/value/health/fitness/coaching/schedule/day/schedule-day.page-type.types.ts"

export const thursday = {
  id: "019ee083-1b25-7384-8e7f-ce0a722cd0e7",
  type: "page-type/schedule-day",
  slug: "thursday",
  title: "Thursday — push",
  dayOfWeek: "thursday",
  focus: "push",
} as const satisfies ScheduleDay

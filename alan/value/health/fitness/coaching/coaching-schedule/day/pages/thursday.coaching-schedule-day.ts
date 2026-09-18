import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const thursday = {
  id: "019ee083-1b25-7384-8e7f-ce0a722cd0e7",
  type: "page-type/coaching-schedule-day",
  slug: "thursday",
  title: "Thursday — push",
  dayOfWeek: "thursday",
  focus: "push",
} as const satisfies CoachingScheduleDay

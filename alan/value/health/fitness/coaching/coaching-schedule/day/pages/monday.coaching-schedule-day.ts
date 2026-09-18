import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const monday = {
  id: "019ee083-1a15-7104-b6ac-7df27e84d0e6",
  type: "page-type/coaching-schedule-day",
  slug: "monday",
  title: "Monday — push",
  dayOfWeek: "monday",
  focus: "push",
} as const satisfies CoachingScheduleDay

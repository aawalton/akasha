import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const saturday = {
  id: "019ee083-1be4-7058-8e6c-ceef411a68b6",
  type: "page-type/coaching-schedule-day",
  slug: "saturday",
  title: "Saturday — legs",
  dayOfWeek: "saturday",
  focus: "legs",
} as const satisfies CoachingScheduleDay

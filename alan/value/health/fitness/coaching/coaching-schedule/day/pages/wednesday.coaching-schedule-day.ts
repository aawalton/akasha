import type { CoachingScheduleDay } from "akasha/alan/value/health/fitness/coaching/coaching-schedule/day/coaching-schedule-day.page-type.types.ts"

export const wednesday = {
  id: "019ee083-1abe-70e8-ab11-c58d79c8ea6f",
  type: "page-type/coaching-schedule-day",
  slug: "wednesday",
  title: "Wednesday — legs",
  dayOfWeek: "wednesday",
  focus: "legs",
} as const satisfies CoachingScheduleDay

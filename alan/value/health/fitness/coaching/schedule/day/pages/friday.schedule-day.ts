import type { ScheduleDay } from "akasha/alan/value/health/fitness/coaching/schedule/day/schedule-day.page-type.types.ts"

export const friday = {
  id: "019ee083-1b84-7b0d-bfc9-bbbecca20c22",
  type: "page-type/schedule-day",
  slug: "friday",
  title: "Friday — pull",
  dayOfWeek: "friday",
  focus: "pull",
} as const satisfies ScheduleDay

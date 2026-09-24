import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const britboxTrialConverts = {
  id: "01a0d38a-512e-7ca7-9a8b-8b8ac09d7da8",
  type: "page-type/reminder",
  slug: "britbox-trial-converts",
  to: "persona/amy",
  from: "persona/amy",
  schedule: "2026-09-30 09:00",
  text: "Alan's BritBox Standard free trial on Prime Video renews at $10.99 a month from October 1, 2026. Ask him whether to keep it or cancel it, and cancel it at https://www.amazon.com/gp/video/subscriptions/manage if he says so.",
} as const satisfies Reminder

import type { Reminder } from "../reminder.page-type.ts"

export const akashaReminderTest = {
  id: "01a06519-5c2c-7000-ba07-cbb84e13ff72",
  pageTypeSlug: "reminder",
  slug: "akasha-reminder-test",
  to: "akasha",
  from: "akasha",
  schedule: "*:0/1",
  text: "REMINDER TEST — if you are reading this, the reminder sender works and the fifteen-minute reminder can be relied on. Delete this test reminder page and set the real one.",
} as const satisfies Reminder

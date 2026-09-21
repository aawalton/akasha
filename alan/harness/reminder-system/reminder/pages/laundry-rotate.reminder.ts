import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const laundryRotate = {
  id: "01a0c4a5-6c9b-7b9a-a333-9d9bda46d72c",
  type: "page-type/reminder",
  slug: "laundry-rotate",
  to: "persona/amy",
  from: "persona/amy",
  schedule: "2026-09-21 10:14:00",
  text: "Tell Alan it is time to rotate the laundry. He completed Laundry - Start Load at 09:13:51 this morning, and this falls an hour after that. Laundry - Rotate, Laundry - Rotate 2 and Laundry - Put Away are all due today, and each was last completed on 2026-09-14.",
} as const satisfies Reminder

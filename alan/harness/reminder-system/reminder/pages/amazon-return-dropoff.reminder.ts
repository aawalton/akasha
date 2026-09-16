import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const amazonReturnDropoff = {
  id: "01a0a80d-8e52-7c74-92cc-786178bfdb05",
  type: "page-type/reminder",
  slug: "amazon-return-dropoff",
  to: "persona/amy",
  from: "persona/amy",
  schedule: "2026-09-21 09:00:00",
  text: "Tell Alan the Amazon return has to be dropped off by Wednesday, September 23, at any Kohl's location. One item, the Onyx Professional Cracked Heel Treatment, on order 112-7699565-8072244, returned as not as expected. The QR code and return code are in the `Your return summary` mail from return@amazon.com, archived on September 15.",
} as const satisfies Reminder

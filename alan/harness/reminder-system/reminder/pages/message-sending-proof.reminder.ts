import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const messageSendingProof = {
  id: "01a0c9b7-2676-7f83-bb30-664ae92b9202",
  type: "page-type/reminder",
  slug: "message-sending-proof",
  to: "persona/akasha",
  from: "persona/akasha",
  schedule: "2026-09-22 09:32:00",
  text: "Proof that a send reaches the pages service now that sending is parted from the change engine. This reminder and the message it sends are both taken away at once.",
} as const satisfies Reminder

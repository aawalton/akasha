import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const messageWriterProof = {
  id: "01a0c9c4-7066-7231-bc99-8924d7716a21",
  type: "page-type/reminder",
  slug: "message-writer-proof",
  to: "persona/akasha",
  from: "persona/akasha",
  schedule: "2026-09-22 09:41:30",
  text: "Proof that a send with no origin stated and a writer named as an address lands a message page. This reminder and the message it sends are both taken away at once.",
} as const satisfies Reminder

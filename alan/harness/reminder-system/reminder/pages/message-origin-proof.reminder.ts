import type { Reminder } from "akasha/alan/harness/reminder-system/reminder/reminder.page-type.types.ts"

export const messageOriginProof = {
  id: "01a0c9c0-1d0a-7aaf-a57b-300ddbb3e785",
  type: "page-type/reminder",
  slug: "message-origin-proof",
  to: "persona/akasha",
  from: "persona/akasha",
  schedule: "2026-09-22 09:36:30",
  text: "Proof that a send with no origin in the environment reaches the pages service on this workstation. This reminder and the message it sends are both taken away at once.",
} as const satisfies Reminder

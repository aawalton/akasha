import type { Reminder } from "akasha/alan/harness/reminder-system/reminders/reminder.page-type.types.ts"

export const telnyxApprovalCheck = {
  id: "01a09549-4f3d-7cbb-a8f8-60e32af6b3fa",
  type: "reminder",
  slug: "telnyx-approval-check",
  to: "amy",
  from: "amy",
  schedule: "*-*-* 09:00:00",
  text: "Check the amy-telnyx-approval submission. Telnyx request 25418a34-7d8c-5304-af97-9679752f983c, Waiting For Customer since Aug 7. Read the request's current status and its one mutable reason note before anything overwrites it, and tell Alan what changed. Take this reminder away once the reviewer has answered.",
} as const satisfies Reminder

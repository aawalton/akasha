import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a090ed-0ccf-7000-b711-370c53dfcbb8",
  type: "seat",
  slug: "aelwyn",
  persona: "aelwyn",
  assignmentSlug: "initiative/aelwyn-strength-training",
  role: "coach",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "0324cc21-a726-49d2-b021-97c14526d4ec",
} as const satisfies Seat

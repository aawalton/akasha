import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const akashaRecorder = {
  id: "01a0e975-b42c-7000-b89a-6cf495b7de8e",
  type: "page-type/seat",
  slug: "akasha-recorder",
  persona: "persona/claude",
  assignmentSlug: "domain/akasha",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "30709403-d27d-49f1-a470-f4d5feab2be3",
} as const satisfies Seat

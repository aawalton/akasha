import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const akashaRecorder = {
  id: "01a149a5-33b5-7000-829c-6293af956cb4",
  type: "page-type/seat",
  slug: "akasha-recorder",
  persona: "persona/claude",
  assignmentSlug: "domain/akasha",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-17T11:35:26.350Z",
  updatedAt: "2026-10-17T11:35:26.350Z",
} as const satisfies Seat

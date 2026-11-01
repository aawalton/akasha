import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const allAboutAlanRecorder = {
  id: "01a19714-f928-768a-9900-1f1f49cdf19b",
  type: "page-type/seat",
  slug: "all-about-alan-recorder",
  persona: "persona/claude",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-11-01T12:28:16.893Z",
  updatedAt: "2026-11-01T12:28:16.893Z",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const allAboutAlanRecorder = {
  id: "01a15e70-3705-7000-9023-fa9f119d9ae8",
  type: "page-type/seat",
  slug: "all-about-alan-recorder",
  persona: "persona/claude",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-21T12:29:35.285Z",
  updatedAt: "2026-10-21T12:29:35.285Z",
} as const satisfies Seat

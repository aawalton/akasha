import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const allAboutAlanRecorder = {
  id: "01a11c1b-f910-7000-8d16-f9794a50368e",
  type: "page-type/seat",
  slug: "all-about-alan-recorder",
  persona: "persona/claude",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-08T15:22:48.959Z",
  updatedAt: "2026-10-08T15:22:48.959Z",
} as const satisfies Seat

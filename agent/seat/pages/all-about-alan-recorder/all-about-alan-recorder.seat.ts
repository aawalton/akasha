import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const allAboutAlanRecorder = {
  id: "01a0c9a3-bf05-7000-b667-8410e61d0d35",
  type: "page-type/seat",
  slug: "all-about-alan-recorder",
  persona: "persona/claude",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/recorder",
  principalSeatName: "seat/abby",
  startMode: "headless",
  onCall: false,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "81813a24-00cb-43e5-b3be-6e8737683e77",
} as const satisfies Seat

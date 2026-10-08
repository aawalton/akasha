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
  claudeCodeSessionUuid: "a5672f07-6117-459a-95d9-50f10ee5d6aa",
} as const satisfies Seat

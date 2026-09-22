import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const learnEverythingRecorder = {
  id: "01a0ca57-df74-7000-9c2f-ee6de273ef43",
  type: "page-type/seat",
  slug: "learn-everything-recorder",
  persona: "persona/claude",
  assignmentSlug: "alan-book/learn-everything",
  role: "role/recorder",
  principalSeatName: "seat/ali",
  startMode: "headless",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thornfordRoleplayRecorder = {
  id: "01a14b71-b1de-7000-a64f-3f75ee486bfe",
  type: "page-type/seat",
  slug: "thornford-roleplay-recorder",
  persona: "persona/claude",
  assignmentSlug: "story-played/thornford",
  role: "role/roleplay-recorder",
  principalSeatName: "seat/shaestrel-roleplay-thornford",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-17T19:58:25.253Z",
  updatedAt: "2026-10-17T19:58:25.253Z",
} as const satisfies Seat

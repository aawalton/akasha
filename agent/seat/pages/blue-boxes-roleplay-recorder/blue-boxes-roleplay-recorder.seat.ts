import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const blueBoxesRoleplayRecorder = {
  id: "01a14aeb-ecd5-7000-9b2a-5ec36396d156",
  type: "page-type/seat",
  slug: "blue-boxes-roleplay-recorder",
  persona: "persona/claude",
  assignmentSlug: "story-played/blue-boxes",
  role: "role/roleplay-recorder",
  principalSeatName: "seat/mari",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "5c09fa29-e8fc-4739-ae45-1e1acff81c9d",
  createdAt: "2026-10-17T17:32:18.499Z",
  updatedAt: "2026-10-17T17:32:21.366Z",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const blueBoxesRoleplayWorldbuilder = {
  id: "01a14af0-9f73-7000-a1b1-d3b71f9dbf7d",
  type: "page-type/seat",
  slug: "blue-boxes-roleplay-worldbuilder",
  persona: "persona/claude",
  assignmentSlug: "story-played/blue-boxes",
  role: "role/roleplay-worldbuilder",
  principalSeatName: "seat/mari",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "c6054ca0-fb0a-49fe-95e0-21b080b4245f",
  createdAt: "2026-10-17T17:37:26.379Z",
  updatedAt: "2026-10-17T17:37:29.484Z",
} as const satisfies Seat

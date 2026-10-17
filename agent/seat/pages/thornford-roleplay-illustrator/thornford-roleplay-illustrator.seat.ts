import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thornfordRoleplayIllustrator = {
  id: "01a14bb2-a3a4-7000-a8c2-f624a6f99505",
  type: "page-type/seat",
  slug: "thornford-roleplay-illustrator",
  persona: "persona/claude",
  assignmentSlug: "story-played/thornford",
  role: "role/roleplay-illustrator",
  principalSeatName: "seat/awen",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-17T21:09:21.437Z",
  updatedAt: "2026-10-17T21:09:21.437Z",
} as const satisfies Seat

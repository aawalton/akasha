import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thornfordRoleplayWorldbuilder = {
  id: "01a14b71-bb1b-7000-a692-4b640e115128",
  type: "page-type/seat",
  slug: "thornford-roleplay-worldbuilder",
  persona: "persona/claude",
  assignmentSlug: "story-played/thornford",
  role: "role/roleplay-worldbuilder",
  principalSeatName: "seat/shaestrel-roleplay-thornford",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-17T19:58:27.704Z",
  updatedAt: "2026-10-17T19:58:27.704Z",
} as const satisfies Seat

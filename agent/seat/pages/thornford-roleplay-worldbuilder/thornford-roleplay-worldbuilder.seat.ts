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
  claudeCodeSessionUuid: "a95eb811-217b-472f-8820-3c275c79194a",
  createdAt: "2026-10-17T19:58:27.704Z",
  updatedAt: "2026-10-17T19:58:32.025Z",
} as const satisfies Seat

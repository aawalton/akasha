import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0b6bd-0e2c-7000-b486-6c41bb2d6b8c",
  type: "page-type/seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "initiative/eppie-music-improvements",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "22a92bee-e103-4d09-b996-0e0bcfa4b9e4",
} as const satisfies Seat

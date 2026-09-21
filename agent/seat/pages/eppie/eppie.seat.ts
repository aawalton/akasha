import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0c42d-b1bf-7000-a0b7-17b1cbab46db",
  type: "page-type/seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "initiative/eppie-music-improvements",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "33422271-ccb9-44d8-84a0-b5ebdb10725d",
} as const satisfies Seat

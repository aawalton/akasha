import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const eppie = {
  id: "01a0a53a-5c89-7000-b144-3df1c7e52a08",
  type: "seat",
  slug: "eppie",
  persona: "persona/eppie",
  assignmentSlug: "initiative/eppie-music-improvements",
  role: "role/companion",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "c6f1cb51-372f-471a-b453-e053dbf12c2a",
} as const satisfies Seat

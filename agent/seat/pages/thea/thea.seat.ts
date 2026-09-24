import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const thea = {
  id: "01a0babc-4662-7000-af44-8768b5948f31",
  type: "page-type/seat",
  slug: "thea",
  persona: "persona/thea",
  assignmentSlug: "domain/check",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "eb3d8ef0-36cb-4f33-9f2b-384c6cfe9ee3",
} as const satisfies Seat

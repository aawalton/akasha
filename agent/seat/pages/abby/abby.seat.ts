import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a0c57b-417b-7000-bb5c-2c74322b1c81",
  type: "page-type/seat",
  slug: "abby",
  persona: "persona/abby",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

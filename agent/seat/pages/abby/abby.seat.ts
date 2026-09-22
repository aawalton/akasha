import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a0c9ab-df66-7000-b37c-7948547fa048",
  type: "page-type/seat",
  slug: "abby",
  persona: "persona/abby",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a0c9b6-c48f-7000-87e5-e98a8764d71d",
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

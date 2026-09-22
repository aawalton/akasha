import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ali = {
  id: "01a0ca54-e0cd-7000-bce0-9c04336b61be",
  type: "page-type/seat",
  slug: "ali",
  persona: "persona/ali",
  assignmentSlug: "alan-book/learn-everything",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ali = {
  id: "01a0c5fe-a6ad-7000-8d2c-dab950f94624",
  type: "page-type/seat",
  slug: "ali",
  persona: "persona/ali",
  assignmentSlug: "alan-book/learn-everything",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "5fa3b0a5-9b43-4cd5-b53d-2a928a82c333",
} as const satisfies Seat

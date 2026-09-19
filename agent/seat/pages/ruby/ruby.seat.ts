import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ruby = {
  id: "01a0b71a-0f93-7000-98a0-51d78391e1e3",
  type: "page-type/seat",
  slug: "ruby",
  persona: "persona/ruby",
  assignmentSlug: "domain/romance",
  role: "role/coach",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "f6bc5d13-994e-4790-88b4-d8f9822f5296",
} as const satisfies Seat

import type { Seat } from "../seat.page-type.types.ts"

export const alan = {
  id: "01a0778b-113f-7000-9f19-d579bb607440",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "cb835222-957c-4aa6-b1a7-faca796e90b4",
} as const satisfies Seat

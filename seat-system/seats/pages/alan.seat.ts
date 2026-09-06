import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a0778b-113f-7000-9f19-d579bb607440",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

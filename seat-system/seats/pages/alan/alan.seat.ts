import type { Seat } from "../../seat.page-type.types.ts"

export const alan = {
  id: "01a08dcf-3137-7000-9144-7005efade59e",
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
} as const satisfies Seat

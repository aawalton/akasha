import type { Seat } from "../../seat.page-type.types.ts"

export const alan = {
  id: "01a08be7-fbb1-7000-84af-b1245b60adbb",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

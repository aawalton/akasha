import type { Seat } from "../seat.page-type.ts"

export const elin = {
  id: "01a08888-156b-7000-8c9e-787c7a972c4b",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "elin",
  persona: "elin",
  assignmentSlug: "page-type/collection",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

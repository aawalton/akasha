import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const ryn = {
  id: "01a09140-fee5-7000-b6cc-66e5ce9adce8",
  type: "seat",
  slug: "ryn",
  persona: "ryn",
  assignmentSlug: "domain/domain",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

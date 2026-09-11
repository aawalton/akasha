import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const aranya = {
  id: "01a0914e-f2be-7000-b6f3-ab55b8b5560a",
  type: "seat",
  slug: "aranya",
  persona: "aranya",
  assignmentSlug: "domain/infrastructure",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

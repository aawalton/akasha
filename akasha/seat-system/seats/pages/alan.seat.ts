import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a067b5-4723-7000-a6b4-0ee3ddc53d29",
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

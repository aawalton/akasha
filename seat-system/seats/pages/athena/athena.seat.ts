import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const athena = {
  id: "01a090bf-384d-7000-a429-e00697781e56",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "domain/agent",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

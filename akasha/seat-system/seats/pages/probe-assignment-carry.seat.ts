import type { Seat } from "../seat.page-type.ts"

export const probeAssignmentCarry = {
  id: "01a06600-0000-7000-8000-0000000000aa",
  pageTypeSlug: "seat",
  slug: "probe-assignment-carry",
  personaSlug: "athena",
  assignmentSlug: "initiative/akasha-migration",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "headless",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

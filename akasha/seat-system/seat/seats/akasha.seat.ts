import type { Seat } from "../seat.page-type.ts"

export const akasha = {
  id: "01a05331-ed66-7000-a568-5e396b8dc0aa",
  pageTypeSlug: "seat",
  slug: "akasha",
  personaSlug: "akasha",
  assignmentSlug: "domain/akasha-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

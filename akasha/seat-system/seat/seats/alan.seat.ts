import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a04faf-3cb4-7000-aa80-f2825dccf163",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "person/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "495beaef-72c5-4fa9-b5ba-9d3c080560c5",
} as const satisfies Seat

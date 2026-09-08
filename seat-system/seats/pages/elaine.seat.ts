import type { Seat } from "../seat.page-type.ts"

export const elaine = {
  id: "01a08064-3621-7000-87c7-0fa032433b8d",
  pageTypeSlug: "seat",
  slug: "elaine",
  personaSlug: "elaine",
  assignmentSlug: "domain/medicine",
  roleSlug: "coach",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "67dbc9ee-edbe-4273-8ce4-62ba94e53992",
} as const satisfies Seat

import type { Seat } from "../seat.page-type.ts"

export const akasha = {
  id: "01a05d08-3e56-7000-8a7c-bb004b91b880",
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

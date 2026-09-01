import type { Seat } from "../seat.page-type.ts"

export const emberProbe = {
  id: "01a05f00-0000-7000-8000-000000000001",
  pageTypeSlug: "seat",
  slug: "ember-probe",
  personaSlug: "ember",
  assignmentSlug: "initiative/ember-migrate-temper-to-akasha",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

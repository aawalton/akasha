import type { Seat } from "../seat.page-type.ts"

export const astra = {
  id: "01a04e30-28a6-7000-a0b5-14864b81239c",
  pageTypeSlug: "seat",
  slug: "astra",
  personaSlug: "astra",
  assignmentSlug: "domain/pages-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "b8f78244-23a9-423b-98a4-74e08cc50e0e",
} as const satisfies Seat

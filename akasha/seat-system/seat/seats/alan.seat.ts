import type { Seat } from "../seat.page-type.ts"

export const alan = {
  id: "01a05fb8-0eb8-7000-9205-d55f32b9bfaa",
  pageTypeSlug: "seat",
  slug: "alan",
  personaSlug: "amy",
  assignmentSlug: "domain/alan",
  roleSlug: "handler",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

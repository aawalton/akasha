import type { Seat } from "../seat.page-type.ts"

export const abby = {
  id: "01a077ce-e534-7000-a6d6-894439e82f19",
  pageTypeSlug: "seat",
  slug: "abby",
  personaSlug: "abby",
  assignmentSlug: "domain/all-about-alan",
  roleSlug: "interviewer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "28752e0a-63b5-409d-888c-0dcf984ed666",
} as const satisfies Seat

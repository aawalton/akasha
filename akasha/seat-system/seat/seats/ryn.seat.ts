import type { Seat } from "../seat.page-type.ts"

export const ryn = {
  id: "01a053a3-24bc-7000-9a65-3460ec41cbd6",
  pageTypeSlug: "seat",
  slug: "ryn",
  personaSlug: "ryn",
  assignmentSlug: "domain/domain-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

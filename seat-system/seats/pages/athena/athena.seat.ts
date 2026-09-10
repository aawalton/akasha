import type { Seat } from "../../seat.page-type.types.ts"

export const athena = {
  id: "01a08cac-e5ab-7000-a37c-7f984cf46f1b",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "domain/agent",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

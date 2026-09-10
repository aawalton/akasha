import type { Seat } from "../../seat.page-type.types.ts"

export const nimue = {
  id: "01a08cd2-f750-7000-a7d8-5b558d039e25",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "nimue",
  persona: "nimue",
  assignmentSlug: "domain/technology",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

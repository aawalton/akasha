import type { Seat } from "../../seat.page-type.types.ts"

export const awen = {
  id: "01a08d78-eee7-7000-8976-d8e80a33b130",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "awen",
  persona: "awen",
  assignmentSlug: "domain/story",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat

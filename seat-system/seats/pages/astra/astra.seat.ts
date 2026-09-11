import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const astra = {
  id: "01a09106-c92d-7000-a0c9-a91e9387843b",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "astra",
  persona: "astra",
  assignmentSlug: "domain/page",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

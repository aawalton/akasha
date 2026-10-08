import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c16-4ac6-7000-b38b-fd0e346e180f",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

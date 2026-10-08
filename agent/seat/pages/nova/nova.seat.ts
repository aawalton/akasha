import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c2a-4be9-7000-a897-be01e9673aff",
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

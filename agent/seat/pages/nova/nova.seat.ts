import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c23-bb2b-7000-a62c-dfff50535e0c",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-08T15:31:10.749Z",
  updatedAt: "2026-10-08T15:31:10.749Z",
} as const satisfies Seat

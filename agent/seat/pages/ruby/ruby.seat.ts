import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ruby = {
  id: "01a16f91-ac82-7000-89b1-83b8e9f35234",
  type: "page-type/seat",
  slug: "ruby",
  persona: "persona/ruby",
  assignmentSlug: "domain/romance",
  role: "role/coach",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-24T20:19:40.691Z",
  updatedAt: "2026-10-24T20:19:40.691Z",
} as const satisfies Seat

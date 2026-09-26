import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const sophia = {
  id: "01a0de51-df49-7000-9310-f6df172eba11",
  type: "page-type/seat",
  slug: "sophia",
  persona: "persona/sophia",
  assignmentSlug: "page-type/persona",
  role: "role/persona-craft",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

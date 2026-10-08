import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const sophia = {
  id: "01a11c30-ae3c-7000-8769-c7a1968d0dcd",
  type: "page-type/seat",
  slug: "sophia",
  persona: "persona/sophia",
  assignmentSlug: "page-type/persona",
  role: "role/persona-craft",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

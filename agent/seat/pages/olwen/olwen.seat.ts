import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const olwen = {
  id: "01a16f6a-9717-7000-9325-acd4053d5331",
  type: "page-type/seat",
  slug: "olwen",
  persona: "persona/olwen",
  assignmentSlug: "domain/design-interface-system",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-24T19:36:59.304Z",
  updatedAt: "2026-10-24T19:36:59.304Z",
} as const satisfies Seat

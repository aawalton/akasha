import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const dalla = {
  id: "01a0defd-faaa-7000-a21c-b7d937593bd0",
  type: "page-type/seat",
  slug: "dalla",
  persona: "persona/dalla",
  assignmentSlug: "module/change",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

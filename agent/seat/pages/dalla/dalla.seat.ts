import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const dalla = {
  id: "01a0b746-31e8-7000-8022-ec315b967ba1",
  type: "page-type/seat",
  slug: "dalla",
  persona: "persona/dalla",
  assignmentSlug: "module/change",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

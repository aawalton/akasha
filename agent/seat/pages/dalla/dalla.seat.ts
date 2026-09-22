import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const dalla = {
  id: "01a0c97f-ba7e-7000-a3ae-e82c9e708820",
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

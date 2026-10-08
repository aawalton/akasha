import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const astra = {
  id: "01a11bee-f399-7000-a705-fdd4e02d8ca0",
  type: "page-type/seat",
  slug: "astra",
  persona: "persona/astra",
  assignmentSlug: "change-target-subtype/page",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

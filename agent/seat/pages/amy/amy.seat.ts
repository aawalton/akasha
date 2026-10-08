import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a0e92e-5f9d-7000-9766-6e4e478169c9",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "548d34bc-baac-4b98-ac22-3ff0ba37a022",
} as const satisfies Seat

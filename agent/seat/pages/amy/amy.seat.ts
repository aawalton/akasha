import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a0d980-da86-7000-9f7f-b30aceb7b083",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9a9e2b3d-ea55-4255-acae-d46e0a4ed4e7",
} as const satisfies Seat

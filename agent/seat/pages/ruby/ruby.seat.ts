import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ruby = {
  id: "01a16ef8-5da6-7000-9cff-059a820effca",
  type: "page-type/seat",
  slug: "ruby",
  persona: "persona/ruby",
  assignmentSlug: "domain/romance",
  role: "role/coach",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "49d1dc44-b263-4ce0-bc88-56e70416116e",
  createdAt: "2026-10-24T17:32:13.533Z",
  updatedAt: "2026-10-24T17:32:17.785Z",
} as const satisfies Seat

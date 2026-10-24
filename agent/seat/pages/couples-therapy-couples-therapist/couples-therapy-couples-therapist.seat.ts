import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const couplesTherapyCouplesTherapist = {
  id: "01a16f1c-8e48-7000-b6a3-9aae18284763",
  type: "page-type/seat",
  slug: "couples-therapy-couples-therapist",
  persona: "persona/claude",
  assignmentSlug: "domain/couples-therapy",
  role: "role/couples-therapist",
  persons: ["person/alan", "person/jenny"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-24T18:11:45.305Z",
  updatedAt: "2026-10-24T18:11:45.305Z",
} as const satisfies Seat

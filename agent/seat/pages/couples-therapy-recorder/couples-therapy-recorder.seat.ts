import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const couplesTherapyRecorder = {
  id: "01a16f4d-de44-7000-8eb5-11535784bbdc",
  type: "page-type/seat",
  slug: "couples-therapy-recorder",
  persona: "persona/claude",
  assignmentSlug: "domain/couples-therapy",
  role: "role/recorder",
  persons: ["person/alan", "person/jenny"],
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "05471544-2e12-4c57-9c84-8f45c2965ccf",
  createdAt: "2026-10-24T19:05:36.988Z",
  updatedAt: "2026-10-24T19:05:40.785Z",
} as const satisfies Seat

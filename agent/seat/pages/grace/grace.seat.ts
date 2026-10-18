import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const grace = {
  id: "01a14f47-7198-7000-9bbc-3dfbe726e985",
  type: "page-type/seat",
  slug: "grace",
  persona: "persona/grace",
  assignmentSlug: "domain/self-care",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "6d2127b2-c613-4a82-9d53-9c7a6c9a216b",
  createdAt: "2026-10-18T13:50:45.175Z",
  updatedAt: "2026-10-18T13:50:48.459Z",
} as const satisfies Seat

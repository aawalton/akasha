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
  createdAt: "2026-10-18T13:50:45.175Z",
  updatedAt: "2026-10-18T13:50:45.175Z",
} as const satisfies Seat

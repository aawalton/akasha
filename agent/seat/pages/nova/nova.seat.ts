import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11c34-299e-7000-ab45-f4188b5e5311",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "277b08f1-119c-4104-a6fc-afe7298abd80",
  createdAt: "2026-10-08T15:49:03.614Z",
  updatedAt: "2026-10-08T15:49:06.641Z",
} as const satisfies Seat

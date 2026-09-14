import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a0a013-3bd4-7000-8b2a-4eed52c4096a",
  type: "seat",
  slug: "sophia",
  persona: "sophia",
  assignmentSlug: "page-type/persona",
  role: "persona-craft",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "cb632b86-ff6d-484b-85e2-f9c06c4f8790",
} as const satisfies Seat

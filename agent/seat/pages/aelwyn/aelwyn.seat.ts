import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a0b6b3-3bdf-7000-b856-762fe285d6e6",
  type: "page-type/seat",
  slug: "aelwyn",
  persona: "persona/aelwyn",
  assignmentSlug: "domain/fitness",
  role: "role/coach",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "2933019f-a7c7-4865-b7aa-5f9645133eaa",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const athena = {
  id: "01a11c36-e042-7000-95a1-6bb349327cf7",
  type: "page-type/seat",
  slug: "athena",
  persona: "persona/athena",
  assignmentSlug: "namespace/agent",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d07fe6ad-2a5a-4014-bd50-678dda7edfcf",
  createdAt: "2026-10-08T15:52:01.416Z",
  updatedAt: "2026-10-08T15:52:04.363Z",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mari = {
  id: "01a14adc-3f0f-7000-98f0-f80f8f1c6ece",
  type: "page-type/seat",
  slug: "mari",
  persona: "persona/mari",
  assignmentSlug: "story-played/blue-boxes",
  role: "role/roleplay",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "80b8de40-5eea-415e-b21b-03885230758b",
  createdAt: "2026-10-17T17:15:10.970Z",
  updatedAt: "2026-10-17T18:04:35.160Z",
} as const satisfies Seat

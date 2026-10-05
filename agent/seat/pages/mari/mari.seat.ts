import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mari = {
  id: "01a10da8-4ec1-7000-913c-74740742a476",
  type: "page-type/seat",
  slug: "mari",
  persona: "persona/mari",
  assignmentSlug: "domain/arousal",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3d7ab3f6-a2c8-475e-a1a4-0ad133619907",
} as const satisfies Seat

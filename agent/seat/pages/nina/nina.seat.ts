import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nina = {
  id: "01a14f42-2999-7000-bce5-825640a4dc1d",
  type: "page-type/seat",
  slug: "nina",
  persona: "persona/nina",
  assignmentSlug: "domain/akasha",
  role: "role/worker",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ac419eec-88f4-4a36-b10a-d6a1cb283920",
  createdAt: "2026-10-18T13:44:59.012Z",
  updatedAt: "2026-10-18T13:45:02.488Z",
} as const satisfies Seat

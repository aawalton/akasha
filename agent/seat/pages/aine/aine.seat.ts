import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a15448-4334-7000-9aaf-4a1853e47de0",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3e750a4a-83ac-4c06-8959-bb24a6814590",
  createdAt: "2026-10-19T13:09:44.752Z",
  updatedAt: "2026-10-19T13:09:47.897Z",
} as const satisfies Seat

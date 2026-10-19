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
  createdAt: "2026-10-19T13:09:44.752Z",
  updatedAt: "2026-10-19T13:09:44.752Z",
} as const satisfies Seat

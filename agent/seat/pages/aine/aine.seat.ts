import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a16ef2-c77c-7000-b35e-d99b62314558",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "29b46843-cb1b-4b9f-9955-e231fe563dc2",
  createdAt: "2026-10-24T17:26:07.432Z",
  updatedAt: "2026-10-24T17:26:11.523Z",
} as const satisfies Seat

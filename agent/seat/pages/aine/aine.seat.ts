import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a16410-363b-7000-a2b8-c7413b41f2e6",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "2f537ec0-6f8c-40d4-a89c-77fcec68d394",
  createdAt: "2026-10-22T14:42:27.145Z",
  updatedAt: "2026-10-22T14:42:29.789Z",
} as const satisfies Seat

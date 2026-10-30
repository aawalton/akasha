import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a18d51-4ffe-7167-8ecf-6e9e9060f53e",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "90762f50-472e-4bc7-815a-aa723f21cdcf",
  createdAt: "2026-10-30T14:57:59.526Z",
  updatedAt: "2026-10-30T14:58:14.695Z",
} as const satisfies Seat

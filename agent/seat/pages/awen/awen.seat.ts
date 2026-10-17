import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const awen = {
  id: "01a14aa5-718b-7000-b782-af92a7a656b6",
  type: "page-type/seat",
  slug: "awen",
  persona: "persona/awen",
  assignmentSlug: "namespace/story",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "72c720d9-72fe-4483-8a9a-7851c0b4cbbd",
  createdAt: "2026-10-17T16:15:19.467Z",
  updatedAt: "2026-10-17T16:15:22.952Z",
} as const satisfies Seat

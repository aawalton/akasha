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
  createdAt: "2026-10-17T16:15:19.467Z",
  updatedAt: "2026-10-17T16:15:19.467Z",
} as const satisfies Seat

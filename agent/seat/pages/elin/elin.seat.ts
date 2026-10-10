import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a126b0-9b15-7000-b4f3-f7da3d63d6a2",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-10T16:41:11.158Z",
  updatedAt: "2026-10-10T16:41:11.158Z",
} as const satisfies Seat

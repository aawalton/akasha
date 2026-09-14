import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aranya = {
  id: "01a0a003-e762-7000-80a7-1fdc774181ba",
  type: "seat",
  slug: "aranya",
  persona: "persona/aranya",
  assignmentSlug: "initiative/aranya-offload-to-cluster",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "b1b6e612-2c65-4dd6-9a56-47fe1801c4d6",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a0c43b-a4d7-7000-8a6d-fde89ae9b806",
  type: "page-type/seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "namespace/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat

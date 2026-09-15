import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a0a29d-88c8-7000-87af-50fdfeb876cf",
  type: "page-type/seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "initiative/ryn-file-structure",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "dd1780a5-71ed-40dc-a61d-eed0779b77fd",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aelwyn = {
  id: "01a115b8-3fdb-7000-b6c3-6f3accbd4b13",
  type: "page-type/seat",
  slug: "aelwyn",
  persona: "persona/aelwyn",
  assignmentSlug: "domain/fitness",
  role: "role/coach",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

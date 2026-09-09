import type { Seat } from "../seat.page-type.ts"

export const ryn = {
  id: "01a06c47-5b71-7000-bab3-06f11b6b9fcf",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "ryn",
  persona: "ryn",
  assignmentSlug: "initiative/ryn-standard-agent-english",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "658167ef-bae7-4e7f-b441-12f62294e594",
} as const satisfies Seat

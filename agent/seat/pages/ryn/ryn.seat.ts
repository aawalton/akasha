import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ryn = {
  id: "01a1552c-a64a-7000-ba7b-033c5cf89f68",
  type: "page-type/seat",
  slug: "ryn",
  persona: "persona/ryn",
  assignmentSlug: "access-kind/domain",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "6dd8db8b-6134-46cd-b74b-5d140c993abc",
  createdAt: "2026-10-19T17:19:12.364Z",
  updatedAt: "2026-10-19T17:19:16.004Z",
} as const satisfies Seat

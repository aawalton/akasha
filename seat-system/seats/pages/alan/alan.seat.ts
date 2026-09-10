import type { Seat } from "../../seat.page-type.types.ts"

export const alan = {
  id: "01a08be7-fbb1-7000-84af-b1245b60adbb",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "alan",
  persona: "amy",
  assignmentSlug: "domain/alan",
  role: "handler",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "87b24c86-1853-42bd-8eb6-49fac162a727",
} as const satisfies Seat

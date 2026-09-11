import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const eppie = {
  id: "01a090f1-3fec-7000-b1ed-04747a27266e",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "eppie",
  persona: "eppie",
  assignmentSlug: "initiative/eppie-agent-stop-hook",
  role: "companion",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "2eb9de41-4237-4510-8739-04d530ec8a3d",
} as const satisfies Seat

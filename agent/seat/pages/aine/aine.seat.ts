import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aine = {
  id: "01a0a4ee-7f65-7000-84ca-3f948cd4d245",
  type: "seat",
  slug: "aine",
  persona: "persona/aine",
  assignmentSlug: "page-type/finding",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "75f59e44-5f2b-4538-95ad-1eacba373606",
} as const satisfies Seat

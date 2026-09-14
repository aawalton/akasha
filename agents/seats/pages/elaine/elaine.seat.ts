import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const elaine = {
  id: "01a0a0ef-0207-7000-af6a-d0539ea8cbb4",
  type: "seat",
  slug: "elaine",
  persona: "elaine",
  assignmentSlug: "domain/medicine",
  role: "coach",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "2f4fbef3-d068-4bb9-89e8-53b1aaba07d2",
} as const satisfies Seat

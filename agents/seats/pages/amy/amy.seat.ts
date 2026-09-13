import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const amy = {
  id: "01a09581-cb35-7000-b00f-7156d6b3ce13",
  type: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "initiative/amy-harness-improvements",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "55ba39fe-ed6c-409f-894b-24a973c972f3",
} as const satisfies Seat

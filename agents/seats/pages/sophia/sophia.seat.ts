import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const sophia = {
  id: "01a09560-93e0-7000-9341-f4533ae62949",
  type: "seat",
  slug: "sophia",
  persona: "sophia",
  assignmentSlug: "initiative/sophia-agent-stop-hook",
  role: "persona-craft",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "d2634411-9f63-4586-a122-e91862ec427c",
} as const satisfies Seat

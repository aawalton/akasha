import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const athena = {
  id: "01a09c18-3f02-7000-a2a3-7547349566d0",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "initiative/athena-agent-harness-improvements",
  role: "role/definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "5322dc4e-5d25-4f45-8ec2-29cb0c09f468",
} as const satisfies Seat

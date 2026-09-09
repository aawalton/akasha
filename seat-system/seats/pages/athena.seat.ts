import type { Seat } from "../seat.page-type.ts"

export const athena = {
  id: "01a08197-ca18-7000-96a6-c880b5f44819",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "initiative/athena-commands-at-the-root",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "2e2e5171-908e-48fb-8d14-eebb2acd34c2",
} as const satisfies Seat

import type { Seat } from "../../seat.page-type.types.ts"

export const athena = {
  id: "01a08cac-e5ab-7000-a37c-7f984cf46f1b",
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
  claudeCodeSessionUuid: "5691e0f5-c7ea-42e6-9840-d26b91fa5f16",
} as const satisfies Seat

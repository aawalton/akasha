import type { Seat } from "akasha/agents/seats/seat.page-type.types.ts"

export const olwen = {
  id: "01a09c5a-5d65-7000-a802-ca13fcc51fb2",
  type: "seat",
  slug: "olwen",
  persona: "persona/olwen",
  assignmentSlug: "initiative/olwen-pages-system-display",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "370fccd3-6b0c-4b0f-a558-61d4c9e33fa2",
} as const satisfies Seat

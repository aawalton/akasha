import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a0d377-c89a-7000-bc96-2aea29720a6f",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "ffd00ddb-2bf4-4c35-9661-35c7a2e63eb7",
} as const satisfies Seat

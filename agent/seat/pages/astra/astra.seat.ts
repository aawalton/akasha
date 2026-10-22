import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const astra = {
  id: "01a11bee-f399-7000-a705-fdd4e02d8ca0",
  type: "page-type/seat",
  slug: "astra",
  persona: "persona/astra",
  assignmentSlug: "page-type/page",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "6da6d673-4649-42c2-8b65-68fa27f55026",
  createdAt: "2026-10-22T14:54:04.318Z",
  updatedAt: "2026-10-22T14:54:04.318Z",
} as const satisfies Seat

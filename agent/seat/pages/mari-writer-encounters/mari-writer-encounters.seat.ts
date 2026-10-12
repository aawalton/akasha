import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWriterEncounters = {
  id: "01a1303d-fb5e-7000-a288-3386df7d08c3",
  type: "page-type/seat",
  slug: "mari-writer-encounters",
  persona: "persona/mari",
  assignmentSlug: "story-written/encounters",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-12T13:12:11.259Z",
  updatedAt: "2026-10-12T13:12:11.259Z",
} as const satisfies Seat

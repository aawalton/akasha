import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWriterGiftedReborn = {
  id: "01a17fb8-6f31-759f-814b-2cc069293f96",
  type: "page-type/seat",
  slug: "iris-writer-gifted-reborn",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/writer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:35:56.300Z",
  updatedAt: "2026-10-27T23:35:56.300Z",
} as const satisfies Seat

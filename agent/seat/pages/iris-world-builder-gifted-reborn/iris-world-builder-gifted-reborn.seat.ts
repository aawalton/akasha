import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisWorldBuilderGiftedReborn = {
  id: "01a17fb8-3892-7391-b9d5-db545b85fa2d",
  type: "page-type/seat",
  slug: "iris-world-builder-gifted-reborn",
  persona: "persona/iris",
  assignmentSlug: "story-played/gifted-reborn",
  role: "role/world-builder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:35:42.325Z",
  updatedAt: "2026-10-27T23:35:42.325Z",
} as const satisfies Seat

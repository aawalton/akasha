import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ariaWriterDragonsAndDungeons = {
  id: "01a0e3a2-ba16-7000-b21d-34c06aab0e11",
  type: "page-type/seat",
  slug: "aria-writer-dragons-and-dungeons",
  persona: "persona/aria",
  assignmentSlug: "story-played/dragons-and-dungeons",
  role: "role/writer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

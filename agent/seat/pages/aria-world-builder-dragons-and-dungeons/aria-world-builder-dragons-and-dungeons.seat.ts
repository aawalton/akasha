import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const ariaWorldBuilderDragonsAndDungeons = {
  id: "01a0e3a2-a631-7000-916a-e70d768a21d7",
  type: "page-type/seat",
  slug: "aria-world-builder-dragons-and-dungeons",
  persona: "persona/aria",
  assignmentSlug: "story-played/dragons-and-dungeons",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

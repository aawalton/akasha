import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderEmberdeep = {
  id: "01a0fdb3-d054-7000-ad72-24d8134c59c8",
  type: "page-type/seat",
  slug: "mari-world-builder-emberdeep",
  persona: "persona/mari",
  assignmentSlug: "story-written/emberdeep",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

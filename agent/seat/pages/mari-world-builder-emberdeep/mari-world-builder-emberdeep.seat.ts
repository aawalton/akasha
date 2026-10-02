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
  claudeCodeSessionUuid: "2d61d352-b67d-425e-9564-4d58bdd0268f",
} as const satisfies Seat

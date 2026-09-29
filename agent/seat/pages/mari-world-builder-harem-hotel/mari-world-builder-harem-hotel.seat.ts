import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariWorldBuilderHaremHotel = {
  id: "01a0eb68-3c9d-7000-8008-2b0c44e49a06",
  type: "page-type/seat",
  slug: "mari-world-builder-harem-hotel",
  persona: "persona/mari",
  assignmentSlug: "story-written/harem-hotel",
  role: "role/world-builder",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "712700ce-446c-4435-bd7e-49ca68edd857",
} as const satisfies Seat

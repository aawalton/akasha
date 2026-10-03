import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariBeatEditorFairweather = {
  id: "01a10387-6a52-7000-92ab-cde73326050b",
  type: "page-type/seat",
  slug: "mari-beat-editor-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/beat-editor",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

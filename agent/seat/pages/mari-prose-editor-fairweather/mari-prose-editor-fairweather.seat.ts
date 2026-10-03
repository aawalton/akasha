import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariProseEditorFairweather = {
  id: "01a10387-b479-7000-841e-a1ae30a815b6",
  type: "page-type/seat",
  slug: "mari-prose-editor-fairweather",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/prose-editor",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "37c605d2-6586-4441-8f07-2d869439fea8",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const dalla = {
  id: "01a0defd-faaa-7000-a21c-b7d937593bd0",
  type: "page-type/seat",
  slug: "dalla",
  persona: "persona/dalla",
  assignmentSlug: "module/change",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "19b82dea-1d27-44c7-ac63-e926303bcc34",
} as const satisfies Seat

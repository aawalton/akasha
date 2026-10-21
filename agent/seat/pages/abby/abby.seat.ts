import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a15e6f-2b86-7000-9eef-2f6ae70c06eb",
  type: "page-type/seat",
  slug: "abby",
  persona: "persona/abby",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "cb0aa1cf-d94c-4db6-b4b8-c2b5424b379b",
  createdAt: "2026-10-21T12:28:26.836Z",
  updatedAt: "2026-10-21T12:28:30.374Z",
} as const satisfies Seat

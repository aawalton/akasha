import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a0e974-784b-7000-8525-c118aba34651",
  type: "page-type/seat",
  slug: "abby",
  persona: "persona/abby",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "b9204538-9423-4e67-9507-c4dc7e81d4b0",
} as const satisfies Seat

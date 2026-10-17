import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const abby = {
  id: "01a149a4-3393-7000-b457-a71c0ed70ca9",
  type: "page-type/seat",
  slug: "abby",
  persona: "persona/abby",
  assignmentSlug: "alan-book/all-about-alan",
  role: "role/interviewer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "df00044e-222f-44a6-aa30-dd92f5b31615",
  createdAt: "2026-10-17T11:34:20.767Z",
  updatedAt: "2026-10-17T11:34:23.258Z",
} as const satisfies Seat

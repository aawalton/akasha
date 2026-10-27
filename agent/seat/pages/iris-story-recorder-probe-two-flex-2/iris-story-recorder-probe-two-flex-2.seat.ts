import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisStoryRecorderProbeTwoFlex2 = {
  id: "01a17fc8-4910-75b7-8da0-9e5effbd0fa0",
  type: "page-type/seat",
  slug: "iris-story-recorder-probe-two-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/story-recorder",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-27T23:53:15.253Z",
  updatedAt: "2026-10-27T23:53:15.253Z",
} as const satisfies Seat

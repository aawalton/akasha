import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerProbeTwoFlex4 = {
  id: "01a17fd1-87fb-748a-8836-fdf056b0be7e",
  type: "page-type/seat",
  slug: "iris-reviewer-probe-two-flex-4",
  persona: "persona/iris",
  assignmentSlug: "story-played/probe-two",
  role: "role/reviewer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "9656bc39-4f35-411c-ab2b-9e94347816fb",
  createdAt: "2026-10-28T00:03:21.054Z",
  updatedAt: "2026-10-28T00:03:28.106Z",
} as const satisfies Seat

import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex1 = {
  id: "01a0e51e-c050-7000-8a77-c6fe1c00a263",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "13bbc154-a724-4f03-a60a-1f43a94e7238",
} as const satisfies Seat

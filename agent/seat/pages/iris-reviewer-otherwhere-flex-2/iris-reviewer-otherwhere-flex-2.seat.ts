import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex2 = {
  id: "01a0e518-ec4e-7000-8f9b-4c7d38b17ef0",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "ab176433-db73-4dbd-a268-5a4f446d3edb",
} as const satisfies Seat

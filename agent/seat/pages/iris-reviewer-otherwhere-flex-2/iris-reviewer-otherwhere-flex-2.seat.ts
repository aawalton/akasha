import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereFlex2 = {
  id: "01a0e7f1-16e0-7000-b889-9e00137c9cd7",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "f47e49ce-1744-45c9-b521-aed5efe0bff3",
} as const satisfies Seat

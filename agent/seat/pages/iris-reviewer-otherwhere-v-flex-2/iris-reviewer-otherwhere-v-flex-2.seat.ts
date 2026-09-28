import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereVFlex2 = {
  id: "01a0ea0a-1247-7000-964a-4c8dca0f7aa8",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-v-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-v",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

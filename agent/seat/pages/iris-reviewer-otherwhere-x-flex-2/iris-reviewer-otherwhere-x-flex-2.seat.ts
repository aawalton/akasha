import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex2 = {
  id: "01a0ea81-fe48-7000-a8cd-7d1ae5e906cb",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-x-flex-2",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

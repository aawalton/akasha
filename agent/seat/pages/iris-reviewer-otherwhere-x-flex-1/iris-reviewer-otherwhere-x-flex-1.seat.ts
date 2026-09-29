import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const irisReviewerOtherwhereXFlex1 = {
  id: "01a0ea92-a993-7000-bcd9-5c571bcf87cb",
  type: "page-type/seat",
  slug: "iris-reviewer-otherwhere-x-flex-1",
  persona: "persona/iris",
  assignmentSlug: "story-played/otherwhere-x",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
} as const satisfies Seat

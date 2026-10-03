import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex4 = {
  id: "01a1037c-aa15-7000-a9bd-f0ebc4eb0244",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "d790a842-d908-4ad7-92b3-1dc548750fca",
} as const satisfies Seat

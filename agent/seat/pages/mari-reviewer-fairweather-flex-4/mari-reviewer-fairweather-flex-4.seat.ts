import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const mariReviewerFairweatherFlex4 = {
  id: "01a103c8-fcbb-7000-b5b3-0667fde39a36",
  type: "page-type/seat",
  slug: "mari-reviewer-fairweather-flex-4",
  persona: "persona/mari",
  assignmentSlug: "story-written/fairweather",
  role: "role/reviewer",
  person: "person/alan",
  startMode: "seat-mode/headless",
  onCall: false,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "39c42243-ad62-42e4-b671-69f2748a49f9",
} as const satisfies Seat

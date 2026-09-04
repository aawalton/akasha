import type { Question } from "../question.page-type.ts"

export const didTwoNotificationsFromMeLandOnYourPhoneAround120 = {
  id: "019fa8de-adc7-7e7a-a003-3c7dc16bf49b",
  pageTypeSlug: "question",
  slug: "did-two-notifications-from-me-land-on-your-phone-around-12-0",
  ask: "Did two notifications from me land on your phone around 12:04 UTC today, and did they read sensibly?",
  askedBy: "athena",
  askedIn: "019f9d68-65b6-7dd3-a6ed-77f8b0d9b6e4",
  status: "answered",
  offered: [
    "Both arrived and read fine",
    "They arrived but something read wrong",
    "Nothing arrived",
  ],
  answer: "Both arrived and read fine",
  closedAt: "2026-07-28T13:43:49.642Z",
  context: "txt",
} as const satisfies Question

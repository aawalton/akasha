import type { Question } from "../question.page-type.ts"

export const build134IsOnTestflightWithBothDeviceFixesTwoChecks = {
  id: "019f6ee0-2ee0-7940-8c94-f3b36f73a16b",
  pageTypeSlug: "question",
  slug: "build-134-is-on-testflight-with-both-device-fixes-two-checks",
  ask: "Build 134 is on TestFlight with both device fixes. Two checks when you have a minute — how do they look?",
  askedBy: "astra",
  askedIn: "019f3c83-7bbb-7c21-8d46-2b6c5fc68ea4",
  status: "answered",
  offered: [
    "Both pass",
    "Nav URL still 404s/wrong tab — details in chat",
    "No banner while in-app — details in chat",
    "Other — details in chat",
  ],
  answer: "Banner passed, still a 404 in app on the story chapter. Maybe related to audio?",
  closedAt: "2026-07-17T07:36:27.645Z",
  context: "txt",
} as const satisfies Question
